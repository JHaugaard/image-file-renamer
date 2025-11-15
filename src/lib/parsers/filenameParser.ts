/**
 * Filename Parser - Extract dates from image filenames using RegEx patterns
 *
 * Strategy:
 * 1. Try to match common date patterns (YYYY-MM-DD, MM-DD-YYYY, etc.)
 * 2. Validate extracted dates (check for invalid months/days)
 * 3. Handle ambiguous dates with confidence scoring
 * 4. Return structured ParsedDate result
 *
 * RegEx Approach:
 * - Use named capture groups for clarity
 * - Support multiple separators (-, /, _, or none)
 * - Handle dates embedded in text (prefixes/suffixes)
 * - Prioritize unambiguous formats (YYYY-MM-DD) over ambiguous (MM-DD-YYYY vs DD-MM-YYYY)
 */

import { DateSource, ParsedDate } from '../../types'

/**
 * Date pattern definitions with RegEx and confidence scores
 */
interface DatePattern {
  /** RegEx pattern to match */
  regex: RegExp
  /** How to extract date parts from match */
  extract: (match: RegExpMatchArray) => { year: number; month: number; day: number }
  /** Confidence level (1.0 = certain, 0.0 = no confidence) */
  confidence: number
  /** Human-readable description */
  description: string
}

/**
 * Comprehensive list of date patterns to try, in priority order
 * Higher priority = more reliable/unambiguous
 */
const DATE_PATTERNS: DatePattern[] = [
  // ============================================================================
  // HIGHEST PRIORITY: ISO 8601 and YYYY-MM-DD variants (unambiguous)
  // ============================================================================
  {
    regex: /(\d{4})[-_](\d{2})[-_](\d{2})/,
    extract: (match) => ({
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10),
      day: parseInt(match[3], 10),
    }),
    confidence: 1.0,
    description: 'YYYY-MM-DD with separators',
  },
  {
    regex: /(?:^|_)(\d{4})(\d{2})(\d{2})(?:_|$|\.|[^\d])/,
    extract: (match) => ({
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10),
      day: parseInt(match[3], 10),
    }),
    confidence: 1.0,
    description: 'YYYYMMDD without separators',
  },

  // ============================================================================
  // HIGH PRIORITY: MM-DD-YYYY when day > 12 (unambiguous - must be US format)
  // ============================================================================
  {
    regex: /(?:^|[^\d])(\d{2})[-/_](\d{2})[-/_](\d{4})(?:[^\d]|$)/,
    extract: (match) => {
      const first = parseInt(match[1], 10)
      const second = parseInt(match[2], 10)
      const year = parseInt(match[3], 10)

      // If second number > 12, it must be the day (so first is month)
      if (second > 12) {
        return { year, month: first, day: second }
      }
      // If first number > 12, format must be DD-MM-YYYY
      if (first > 12) {
        return { year, month: second, day: first }
      }
      // Ambiguous - default to US format (MM-DD-YYYY)
      return { year, month: first, day: second }
    },
    confidence: 0.8, // Lower confidence for ambiguous dates
    description: 'MM-DD-YYYY or DD-MM-YYYY (ambiguous)',
  },

  // ============================================================================
  // MEDIUM PRIORITY: Two-digit year variants (less reliable)
  // ============================================================================
  {
    regex: /(?:^|[^\d])(\d{2})[-/](\d{2})[-/](\d{2})(?:[^\d]|$)/,
    extract: (match) => {
      const first = parseInt(match[1], 10)
      const second = parseInt(match[2], 10)
      const yearShort = parseInt(match[3], 10)

      // Convert 2-digit year to 4-digit (assume 2000s if < 50, else 1900s)
      const year = yearShort < 50 ? 2000 + yearShort : 1900 + yearShort

      // Try to determine format by checking which makes sense
      if (second > 12) {
        // Must be MM-DD-YY
        return { year, month: first, day: second }
      }
      if (first > 12) {
        // Must be DD-MM-YY
        return { year, month: second, day: first }
      }
      // Ambiguous - default to MM-DD-YY
      return { year, month: first, day: second }
    },
    confidence: 0.6,
    description: 'MM-DD-YY or DD-MM-YY (two-digit year)',
  },
]

/**
 * Validate that a date is realistic and valid
 */
function isValidDate(year: number, month: number, day: number): boolean {
  // Basic range checks
  if (year < 1970 || year > 2100) return false
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false

  // Check if day is valid for the given month
  // Use JavaScript Date object to validate
  const date = new Date(year, month - 1, day) // month is 0-indexed in Date

  // Date constructor auto-corrects invalid dates (e.g., Feb 30 becomes Mar 2)
  // So we verify the resulting date matches our input
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

/**
 * Parse a filename and extract date if present
 *
 * @param filename - The filename to parse (with or without extension)
 * @returns ParsedDate with extracted date or null if no date found
 *
 * @example
 * parseFilename('2024-01-15.jpg')
 * // Returns: { date: Date(2024-01-15), source: 'filename', confidence: 1.0 }
 *
 * parseFilename('vacation_photo.jpg')
 * // Returns: { date: null, source: 'filename', confidence: 0, error: 'No date pattern found' }
 */
export function parseFilename(filename: string): ParsedDate {
  // Try each pattern in priority order
  for (const pattern of DATE_PATTERNS) {
    const match = filename.match(pattern.regex)

    if (match) {
      try {
        const { year, month, day } = pattern.extract(match)

        // Validate the extracted date
        if (!isValidDate(year, month, day)) {
          continue // Try next pattern
        }

        // Create Date object (month is 0-indexed in JavaScript)
        const date = new Date(year, month - 1, day)

        return {
          date,
          source: DateSource.FILENAME,
          confidence: pattern.confidence,
          originalString: match[0].trim().replace(/^[^\d]+|[^\d]+$/g, ''), // Remove leading/trailing non-digits
        }
      } catch (error) {
        // Pattern matched but extraction failed - try next pattern
        continue
      }
    }
  }

  // No pattern matched
  return {
    date: null,
    source: DateSource.FILENAME,
    confidence: 0,
    error: 'No date pattern found in filename',
  }
}

/**
 * Helper: Extract just the base filename without path or extension
 * Useful for processing full file paths
 */
export function getBaseFilename(fullPath: string): string {
  // Remove path
  const filename = fullPath.split('/').pop() || fullPath
  // Remove extension
  return filename.replace(/\.[^.]+$/, '')
}

/**
 * Helper: Check if a date string is ambiguous (could be MM-DD or DD-MM)
 * Useful for warning users about low-confidence parses
 */
export function isAmbiguousDate(dateString: string): boolean {
  const match = dateString.match(/(\d{2})[-/](\d{2})[-/](\d{4})/)
  if (!match) return false

  const first = parseInt(match[1], 10)
  const second = parseInt(match[2], 10)

  // Ambiguous if both numbers are ≤ 12 (could be month or day)
  return first <= 12 && second <= 12
}
