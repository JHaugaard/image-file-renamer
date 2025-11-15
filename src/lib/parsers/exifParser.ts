/**
 * EXIF Parser - Extract creation date from image EXIF metadata
 *
 * Strategy:
 * 1. Read binary image data using FileReader
 * 2. Parse EXIF metadata using exifr library
 * 3. Extract DateTimeOriginal (preferred) or fallback to CreateDate
 * 4. Convert EXIF date format to JavaScript Date
 * 5. Return structured ParsedDate result
 *
 * EXIF Date Fields (in priority order):
 * - DateTimeOriginal: When the photo was actually taken (HIGHEST PRIORITY)
 * - CreateDate: When the file was created
 * - ModifyDate: When the file was last modified (lowest priority)
 *
 * EXIF Date Format: "YYYY:MM:DD HH:MM:SS" (uses colons, not dashes)
 */

import { DateSource, ParsedDate } from '../../types'
import exifr from 'exifr'

/**
 * Parse EXIF metadata from an image file and extract creation date
 *
 * @param file - Image File object (JPEG, HEIC, etc.)
 * @returns Promise<ParsedDate> with extracted date or null if not found
 *
 * @example
 * const file = new File([...], 'photo.jpg', { type: 'image/jpeg' })
 * const result = await parseExif(file)
 * // Returns: { date: Date(2024-01-15), source: 'exif', confidence: 0.9 }
 */
export async function parseExif(file: File): Promise<ParsedDate> {
  try {
    // Check if file is an image type that might have EXIF
    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/heic', 'image/heif']
    if (!supportedTypes.some((type) => file.type.toLowerCase().includes(type.split('/')[1]))) {
      return {
        date: null,
        source: DateSource.EXIF,
        confidence: 0,
        error: `Unsupported file type for EXIF: ${file.type}`,
      }
    }

    // Parse EXIF data from the file
    // exifr can handle File objects directly
    const exifData = await exifr.parse(file, {
      // Request specific date fields
      pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate', 'DateTime'],
    })

    // No EXIF data found
    if (!exifData) {
      return {
        date: null,
        source: DateSource.EXIF,
        confidence: 0,
        error: 'No EXIF data found in file',
      }
    }

    // Try to extract date in priority order
    const dateValue =
      exifData.DateTimeOriginal || exifData.CreateDate || exifData.DateTime || exifData.ModifyDate

    if (!dateValue) {
      return {
        date: null,
        source: DateSource.EXIF,
        confidence: 0,
        error: 'No date fields found in EXIF data',
      }
    }

    // exifr returns dates as Date objects or strings
    let date: Date

    if (dateValue instanceof Date) {
      date = dateValue
    } else if (typeof dateValue === 'string') {
      // Parse EXIF date string format: "YYYY:MM:DD HH:MM:SS"
      date = parseExifDateString(dateValue)
    } else {
      return {
        date: null,
        source: DateSource.EXIF,
        confidence: 0,
        error: 'Unexpected EXIF date format',
      }
    }

    // Validate the date
    if (!isValidDate(date)) {
      return {
        date: null,
        source: DateSource.EXIF,
        confidence: 0,
        error: 'Invalid date in EXIF data',
      }
    }

    // Determine which field was used (for debugging)
    const fieldUsed = exifData.DateTimeOriginal
      ? 'DateTimeOriginal'
      : exifData.CreateDate
        ? 'CreateDate'
        : exifData.DateTime
          ? 'DateTime'
          : 'ModifyDate'

    return {
      date,
      source: DateSource.EXIF,
      confidence: 0.9, // High confidence, but not 1.0 (EXIF can be edited)
      originalString: `EXIF ${fieldUsed}: ${dateValue.toString()}`,
    }
  } catch (error) {
    // Handle errors gracefully
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      date: null,
      source: DateSource.EXIF,
      confidence: 0,
      error: `EXIF parsing error: ${errorMessage}`,
    }
  }
}

/**
 * Parse EXIF date string format to JavaScript Date
 *
 * EXIF uses format: "YYYY:MM:DD HH:MM:SS"
 * JavaScript Date expects: "YYYY-MM-DD HH:MM:SS"
 *
 * @param exifDateString - EXIF formatted date string
 * @returns Date object
 */
function parseExifDateString(exifDateString: string): Date {
  // Replace colons with dashes in the date part (first 10 characters)
  // "2024:01:15 14:30:22" → "2024-01-15 14:30:22"
  const normalizedDate = exifDateString.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')

  return new Date(normalizedDate)
}

/**
 * Validate that a Date object is valid and realistic
 */
function isValidDate(date: Date): boolean {
  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false
  }

  // Check if date is in a realistic range
  const year = date.getFullYear()
  if (year < 1970 || year > 2100) {
    return false
  }

  return true
}

/**
 * Check if a file likely has EXIF data based on type
 * Useful for optimization - skip EXIF parsing for unsupported types
 */
export function hasExifSupport(file: File): boolean {
  const supportedTypes = ['image/jpeg', 'image/jpg', 'image/heic', 'image/heif']
  return supportedTypes.some((type) => file.type.toLowerCase().includes(type.split('/')[1]))
}
