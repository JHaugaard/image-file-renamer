/**
 * Example usage of type system
 *
 * This file demonstrates how the types work together in practice.
 * It's for documentation/learning purposes and won't be used in production.
 */

import type {
  FileMetadata,
  ParsedDate,
  RenameResult,
  ProblematicFile,
  CollisionMap,
  FileProcessingState,
} from './index'
import {
  DateSource,
  FileStatus,
  ProblemType,
  isSupportedImageType,
  isValidParsedDate,
  isSuccessfulRename,
} from './index'

// ============================================================================
// EXAMPLE 1: Creating FileMetadata from a File
// ============================================================================

export function createFileMetadata(file: File): FileMetadata {
  const extension = file.name.substring(file.name.lastIndexOf('.'))

  return {
    file,
    originalName: file.name,
    extension,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified),
  }
}

// ============================================================================
// EXAMPLE 2: Successful date parsing from filename
// ============================================================================

export function exampleSuccessfulParse(): ParsedDate {
  return {
    date: new Date('2024-01-15'),
    source: DateSource.FILENAME,
    confidence: 1.0,
    originalString: '01-15-2024',
  }
}

// ============================================================================
// EXAMPLE 3: Failed date parsing (no date found)
// ============================================================================

export function exampleFailedParse(): ParsedDate {
  return {
    date: null,
    source: DateSource.FILENAME,
    confidence: 0.0,
    originalString: 'vacation_photo',
    error: 'No recognizable date pattern found in filename',
  }
}

// ============================================================================
// EXAMPLE 4: Complete successful RenameResult
// ============================================================================

export function exampleSuccessfulRename(file: File): RenameResult {
  return {
    id: crypto.randomUUID(), // Unique ID for React key
    metadata: createFileMetadata(file),
    parsedDate: {
      date: new Date('2024-01-15'),
      source: DateSource.FILENAME,
      confidence: 1.0,
      originalString: '01-15-2024.jpg',
    },
    newFilename: '2024-01-15.jpg',
    status: FileStatus.SUCCESS,
  }
}

// ============================================================================
// EXAMPLE 5: Problematic file result
// ============================================================================

export function exampleProblematicRename(file: File): RenameResult {
  return {
    id: crypto.randomUUID(),
    metadata: createFileMetadata(file),
    parsedDate: {
      date: null,
      source: DateSource.FILENAME,
      confidence: 0.0,
      error: 'Invalid date format',
    },
    newFilename: '', // Empty because we couldn't generate it
    status: FileStatus.PROBLEMATIC,
    problem: ProblemType.INVALID_DATE,
    notes: ['Original filename: "vacation_photo.jpg"', 'No EXIF data available'],
  }
}

// ============================================================================
// EXAMPLE 6: Building ProblematicFile from RenameResult
// ============================================================================

export function createProblematicFile(result: RenameResult): ProblematicFile | null {
  if (result.status !== FileStatus.PROBLEMATIC || !result.problem) {
    return null
  }

  const reasonMap: Record<ProblemType, string> = {
    [ProblemType.NO_DATE_FOUND]:
      'Could not find a date in filename, EXIF, or file metadata',
    [ProblemType.INVALID_DATE]:
      'Date found but appears to be invalid (e.g., 13/40/2024)',
    [ProblemType.INVALID_FILE_TYPE]: 'File is not a JPEG or HEIC image',
    [ProblemType.MISSING_EXIF]: 'Expected EXIF data but none found',
    [ProblemType.PARSE_ERROR]: 'An error occurred while processing this file',
  }

  const suggestionMap: Record<ProblemType, string> = {
    [ProblemType.NO_DATE_FOUND]:
      'You can manually specify the creation date for this file',
    [ProblemType.INVALID_DATE]: 'Please check the filename format',
    [ProblemType.INVALID_FILE_TYPE]: 'Only JPEG and HEIC files are supported',
    [ProblemType.MISSING_EXIF]: 'Try renaming based on file system date instead',
    [ProblemType.PARSE_ERROR]: 'Try re-uploading the file',
  }

  return {
    filename: result.metadata.originalName,
    problem: result.problem,
    reason: reasonMap[result.problem],
    suggestion: suggestionMap[result.problem],
    metadata: result.metadata,
  }
}

// ============================================================================
// EXAMPLE 7: Collision detection and sequence numbering
// ============================================================================

export function exampleCollisionHandling(): void {
  // Initial state: no collisions yet
  const collisionMap: CollisionMap = {}

  // Three files all have date 2024-01-15
  const baseDate = '2024-01-15'

  // First file: no collision, use base name
  if (!collisionMap[baseDate]) {
    collisionMap[baseDate] = 0
  }
  const filename1 = `${baseDate}.jpg` // "2024-01-15.jpg"
  collisionMap[baseDate]++

  // Second file: collision detected, add sequence -01
  const filename2 = `${baseDate}-${String(collisionMap[baseDate]).padStart(2, '0')}.jpg`
  // "2024-01-15-01.jpg"
  collisionMap[baseDate]++

  // Third file: add sequence -02
  const filename3 = `${baseDate}-${String(collisionMap[baseDate]).padStart(2, '0')}.jpg`
  // "2024-01-15-02.jpg"

  console.log({ filename1, filename2, filename3 })
  // Result: three unique filenames for the same date
}

// ============================================================================
// EXAMPLE 8: Using type guards
// ============================================================================

export function exampleTypeGuards(file: File, result: RenameResult): void {
  // Check if file type is supported
  if (!isSupportedImageType(file)) {
    console.log('Unsupported file type')
    return
  }

  // Check if date was successfully parsed
  if (isValidParsedDate(result.parsedDate)) {
    // TypeScript now knows result.parsedDate.date is Date (not null)
    const year = result.parsedDate.date.getFullYear()
    console.log(`Date extracted: ${year}`)
  }

  // Check if rename was successful
  if (isSuccessfulRename(result)) {
    console.log(`Ready to rename to: ${result.newFilename}`)
  }
}

// ============================================================================
// EXAMPLE 9: Complete processing state
// ============================================================================

export function exampleProcessingState(): FileProcessingState {
  return {
    files: [], // Will be populated with FileMetadata[]
    results: [], // Will be populated with RenameResult[]
    problematicFiles: [], // Will be populated with ProblematicFile[]
    isProcessing: false,
    progress: 0,
    error: null,
  }
}

/**
 * Type Flow Diagram:
 *
 * User uploads File
 *       ↓
 * createFileMetadata(file) → FileMetadata
 *       ↓
 * parseDate(metadata) → ParsedDate
 *       ↓
 * generateFilename(parsedDate) → newFilename: string
 *       ↓
 * detectCollisions(newFilename) → newFilename with sequence number
 *       ↓
 * createRenameResult() → RenameResult
 *       ↓
 *       ├─→ isSuccessfulRename? → Ready to download
 *       └─→ isProblematicRename? → createProblematicFile() → Show to user
 */
