/**
 * Fallback Parser - Extract date from file system metadata (last resort)
 *
 * Strategy:
 * When filename parsing and EXIF extraction both fail, fall back to the file's
 * lastModified timestamp. This is the LEAST reliable method because:
 * - File modification dates can change when files are copied/moved
 * - Doesn't represent when photo was actually taken
 * - But it's better than nothing!
 *
 * Confidence: 0.5 (medium-low) - file system dates are unreliable
 */

import { DateSource, ParsedDate } from '../../types'

/**
 * Extract date from file system lastModified timestamp
 *
 * @param file - File object from browser File API
 * @returns ParsedDate with lastModified date
 *
 * Note: This function should ALWAYS succeed because File objects
 * always have a lastModified timestamp (defaults to current time if not set)
 *
 * @example
 * const file = new File([...], 'photo.jpg', { lastModified: 1705334400000 })
 * const result = parseFallback(file)
 * // Returns: { date: Date(2024-01-15), source: 'file_system', confidence: 0.5 }
 */
export function parseFallback(file: File): ParsedDate {
  try {
    // File.lastModified is a number (milliseconds since epoch)
    const timestamp = file.lastModified

    // Create Date from timestamp
    const date = new Date(timestamp)

    // Validate date
    if (!isValidDate(date)) {
      return {
        date: null,
        source: DateSource.FILE_SYSTEM,
        confidence: 0,
        error: 'Invalid lastModified timestamp',
      }
    }

    // Format timestamp for originalString
    const timestampString = `lastModified: ${timestamp} (${date.toISOString()})`

    return {
      date,
      source: DateSource.FILE_SYSTEM,
      confidence: 0.5, // Medium-low confidence - file dates are unreliable
      originalString: timestampString,
    }
  } catch (error) {
    // This should rarely happen, but handle gracefully
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      date: null,
      source: DateSource.FILE_SYSTEM,
      confidence: 0,
      error: `Fallback parsing error: ${errorMessage}`,
    }
  }
}

/**
 * Validate that a Date object is valid and realistic
 */
function isValidDate(date: Date): boolean {
  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false
  }

  // For fallback parser, we're more lenient since we're using file system dates
  // Accept any valid date (file systems can have old dates from archives, etc.)
  return true
}

/**
 * Helper: Normalize date to midnight (00:00:00)
 *
 * For file renaming, we only care about the date, not the time.
 * This helper creates a new Date with time set to midnight.
 *
 * @param date - Date to normalize
 * @returns New Date with time set to 00:00:00
 *
 * @example
 * const date = new Date('2024-01-15T14:30:22')
 * const normalized = normalizeToMidnight(date)
 * // Returns: Date('2024-01-15T00:00:00')
 */
export function normalizeToMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Helper: Get file age in days
 * Useful for warning users about very old/new files
 *
 * @param file - File object
 * @returns Number of days since file was last modified
 */
export function getFileAgeInDays(file: File): number {
  const now = Date.now()
  const fileDate = file.lastModified
  const ageInMs = now - fileDate
  return Math.floor(ageInMs / (1000 * 60 * 60 * 24))
}

/**
 * Helper: Check if file date is suspicious
 * Returns true if date is far in future or very old
 *
 * @param file - File object
 * @returns true if date seems suspicious
 */
export function isSuspiciousFileDate(file: File): boolean {
  const date = new Date(file.lastModified)
  const now = new Date()

  // Check if date is in the future (beyond tomorrow)
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (date > tomorrow) {
    return true
  }

  // Check if date is before digital cameras existed (pre-1990)
  const year = date.getFullYear()
  if (year < 1990) {
    return true
  }

  return false
}
