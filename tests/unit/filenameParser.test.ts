/**
 * Unit tests for filenameParser
 *
 * TDD Approach: Writing tests FIRST to define expected behavior
 * Then implement the parser to make these tests pass
 */

import { describe, it, expect } from 'vitest'
import { parseFilename } from '../../src/lib/parsers/filenameParser'
import { DateSource } from '../../src/types'

describe('filenameParser', () => {
  describe('YYYY-MM-DD format', () => {
    it('should parse standard YYYY-MM-DD format', () => {
      const result = parseFilename('2024-01-15.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
      expect(result.date?.getMonth()).toBe(0) // January (0-indexed)
      expect(result.date?.getDate()).toBe(15)
      expect(result.source).toBe(DateSource.FILENAME)
      expect(result.confidence).toBe(1.0) // High confidence
      expect(result.originalString).toBe('2024-01-15')
      expect(result.error).toBeUndefined()
    })

    it('should parse YYYY_MM_DD with underscores', () => {
      const result = parseFilename('2024_01_15.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
      expect(result.date?.getMonth()).toBe(0)
      expect(result.date?.getDate()).toBe(15)
    })

    it('should parse YYYYMMDD without separators', () => {
      const result = parseFilename('20240115.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
      expect(result.date?.getMonth()).toBe(0)
      expect(result.date?.getDate()).toBe(15)
    })

    it('should handle YYYY-MM-DD with prefix text', () => {
      const result = parseFilename('IMG_2024-01-15.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
    })

    it('should handle YYYY-MM-DD with suffix text', () => {
      const result = parseFilename('2024-01-15_vacation.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
    })
  })

  describe('MM-DD-YYYY format (US style)', () => {
    it('should parse MM-DD-YYYY format', () => {
      const result = parseFilename('01-15-2024.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
      expect(result.date?.getMonth()).toBe(0) // January
      expect(result.date?.getDate()).toBe(15)
      expect(result.originalString).toBe('01-15-2024')
    })

    it('should parse MM/DD/YYYY with slashes', () => {
      const result = parseFilename('01/15/2024.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
      expect(result.date?.getMonth()).toBe(0)
      expect(result.date?.getDate()).toBe(15)
    })

    it('should parse MM_DD_YYYY with underscores', () => {
      const result = parseFilename('01_15_2024.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
    })
  })

  describe('DD-MM-YYYY format (European style)', () => {
    it('should parse DD-MM-YYYY format when day > 12 (unambiguous)', () => {
      const result = parseFilename('15-01-2024.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
      expect(result.date?.getMonth()).toBe(0) // January
      expect(result.date?.getDate()).toBe(15)
    })

    it('should parse DD/MM/YYYY with slashes', () => {
      const result = parseFilename('15/01/2024.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getDate()).toBe(15)
    })
  })

  describe('ambiguous dates (could be MM-DD or DD-MM)', () => {
    it('should default to MM-DD-YYYY for ambiguous dates (US preference)', () => {
      // 05-03-2024 could be May 3 or March 5
      const result = parseFilename('05-03-2024.jpg')

      // Default to US format (MM-DD-YYYY) → May 3
      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getMonth()).toBe(4) // May (0-indexed)
      expect(result.date?.getDate()).toBe(3)
      expect(result.confidence).toBe(0.8) // Lower confidence due to ambiguity
    })
  })

  describe('edge cases and invalid dates', () => {
    it('should reject invalid month (13)', () => {
      const result = parseFilename('2024-13-15.jpg')

      expect(result.date).toBeNull()
      expect(result.error).toBeDefined()
      expect(result.confidence).toBe(0)
    })

    it('should reject invalid day (32)', () => {
      const result = parseFilename('2024-01-32.jpg')

      expect(result.date).toBeNull()
      expect(result.error).toBeDefined()
    })

    it('should reject invalid day for month (Feb 30)', () => {
      const result = parseFilename('2024-02-30.jpg')

      expect(result.date).toBeNull()
      expect(result.error).toBeDefined()
    })

    it('should handle leap year correctly (Feb 29, 2024)', () => {
      const result = parseFilename('2024-02-29.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getMonth()).toBe(1) // February
      expect(result.date?.getDate()).toBe(29)
    })

    it('should reject Feb 29 in non-leap year', () => {
      const result = parseFilename('2023-02-29.jpg')

      expect(result.date).toBeNull()
      expect(result.error).toBeDefined()
    })
  })

  describe('no date found', () => {
    it('should return null for filenames with no date pattern', () => {
      const result = parseFilename('vacation_photo.jpg')

      expect(result.date).toBeNull()
      expect(result.source).toBe(DateSource.FILENAME)
      expect(result.confidence).toBe(0)
      expect(result.error).toBeDefined()
    })

    it('should return null for random text', () => {
      const result = parseFilename('IMG_1234.jpg')

      expect(result.date).toBeNull()
    })

    it('should return null for incomplete dates', () => {
      const result = parseFilename('2024-01.jpg')

      expect(result.date).toBeNull()
    })
  })

  describe('real-world filename examples', () => {
    it('should parse iPhone photo format (IMG_YYYYMMDD_hhmmss)', () => {
      const result = parseFilename('IMG_20240115_143022.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
      expect(result.date?.getMonth()).toBe(0)
      expect(result.date?.getDate()).toBe(15)
    })

    it('should parse screenshot format (Screenshot 2024-01-15)', () => {
      const result = parseFilename('Screenshot 2024-01-15 at 2.30.45 PM.png')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
    })

    it('should parse Android photo format', () => {
      const result = parseFilename('20240115_143022.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
    })

    it('should parse descriptive filename with date', () => {
      const result = parseFilename('Birthday Party 01-15-2024.jpg')

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
    })
  })

  describe('extensions and case sensitivity', () => {
    it('should work with .HEIC extension', () => {
      const result = parseFilename('2024-01-15.HEIC')

      expect(result.date).toBeInstanceOf(Date)
    })

    it('should work with uppercase filename', () => {
      const result = parseFilename('IMG_2024-01-15.JPG')

      expect(result.date).toBeInstanceOf(Date)
    })

    it('should work without extension', () => {
      const result = parseFilename('2024-01-15')

      expect(result.date).toBeInstanceOf(Date)
    })
  })
})
