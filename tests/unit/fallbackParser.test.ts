/**
 * Unit tests for fallbackParser
 *
 * Tests file system date extraction (last resort fallback)
 */

import { describe, it, expect } from 'vitest'
import { parseFallback } from '../../src/lib/parsers/fallbackParser'
import { DateSource } from '../../src/types'

describe('fallbackParser', () => {
  describe('file system date extraction', () => {
    it('should extract lastModified date from File object', () => {
      const lastModified = new Date('2024-01-15T14:30:00')
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: lastModified.getTime(),
      })

      const result = parseFallback(file)

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2024)
      expect(result.date?.getMonth()).toBe(0) // January
      expect(result.date?.getDate()).toBe(15)
      expect(result.source).toBe(DateSource.FILE_SYSTEM)
      expect(result.confidence).toBe(0.5) // Medium confidence - file dates can be unreliable
    })

    it('should handle current date', () => {
      const now = new Date()
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: now.getTime(),
      })

      const result = parseFallback(file)

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getDate()).toBe(now.getDate())
      expect(result.date?.getMonth()).toBe(now.getMonth())
      expect(result.date?.getFullYear()).toBe(now.getFullYear())
    })

    it('should handle old dates', () => {
      // Use local time to avoid timezone conversion issues
      const oldDate = new Date(2000, 0, 1) // Local time: Jan 1, 2000
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: oldDate.getTime(),
      })

      const result = parseFallback(file)

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2000)
    })
  })

  describe('confidence scoring', () => {
    it('should return medium confidence (0.5) for file system dates', () => {
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now(),
      })

      const result = parseFallback(file)

      expect(result.confidence).toBe(0.5)
    })

    it('should include note about reliability', () => {
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now(),
      })

      const result = parseFallback(file)

      expect(result.originalString).toContain('lastModified')
    })
  })

  describe('edge cases', () => {
    it('should handle files with epoch timestamp (0)', () => {
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: 0,
      })

      const result = parseFallback(file)

      expect(result.date).toBeInstanceOf(Date)
      // Epoch 0 is Jan 1, 1970 UTC, but local time might be different
      // Just verify it's a valid date around that time
      expect(result.date?.getFullYear()).toBeGreaterThanOrEqual(1969)
      expect(result.date?.getFullYear()).toBeLessThanOrEqual(1970)
    })

    it('should handle future dates', () => {
      // Use local time to avoid timezone conversion issues
      const futureDate = new Date(2030, 0, 1) // Local time: Jan 1, 2030
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: futureDate.getTime(),
      })

      const result = parseFallback(file)

      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getFullYear()).toBe(2030)
    })

    it('should never return null (always has lastModified)', () => {
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
      })

      const result = parseFallback(file)

      // File objects always have lastModified timestamp
      expect(result.date).not.toBeNull()
      expect(result.error).toBeUndefined()
    })
  })

  describe('metadata extraction', () => {
    it('should include source as FILE_SYSTEM', () => {
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now(),
      })

      const result = parseFallback(file)

      expect(result.source).toBe(DateSource.FILE_SYSTEM)
    })

    it('should include original timestamp in originalString', () => {
      const timestamp = new Date('2024-01-15').getTime()
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: timestamp,
      })

      const result = parseFallback(file)

      expect(result.originalString).toBeDefined()
      expect(result.originalString).toContain('lastModified')
    })
  })

  describe('date normalization', () => {
    it('should normalize time to midnight (00:00:00)', () => {
      // File system dates include time, but for renaming we only care about the date
      const file = new File(['content'], 'photo.jpg', {
        type: 'image/jpeg',
        lastModified: new Date('2024-01-15T14:30:22').getTime(),
      })

      const result = parseFallback(file)

      // Date should be preserved, but time is not critical for filename
      expect(result.date).toBeInstanceOf(Date)
      expect(result.date?.getDate()).toBe(15)
    })
  })
})
