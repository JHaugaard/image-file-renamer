/**
 * Type definitions for Image File Renamer application
 *
 * This file defines the core type system that models the file renaming workflow:
 * File → Parse Date → Generate New Name → Handle Collisions → Result
 */

// ============================================================================
// ENUMS - Type-safe constants
// ============================================================================

/**
 * DateSource - Where the creation date was extracted from
 *
 * Order matters: represents the fallback hierarchy
 * (filename → EXIF → file system)
 */
export enum DateSource {
  FILENAME = 'filename', // Parsed from original filename (most reliable)
  EXIF = 'exif', // Extracted from EXIF metadata
  FILE_SYSTEM = 'file_system', // File lastModified timestamp (least reliable)
  MANUAL = 'manual', // User manually specified
}

/**
 * FileStatus - Current processing status of a file
 */
export enum FileStatus {
  PENDING = 'pending', // Not yet processed
  SUCCESS = 'success', // Successfully parsed and ready to rename
  PROBLEMATIC = 'problematic', // Has issues, needs user intervention
}

/**
 * ProblemType - Categorizes why a file couldn't be auto-processed
 */
export enum ProblemType {
  NO_DATE_FOUND = 'no_date_found', // Couldn't extract date from any source
  INVALID_DATE = 'invalid_date', // Date found but invalid (e.g., 13/40/2024)
  INVALID_FILE_TYPE = 'invalid_file_type', // Not JPEG or HEIC
  MISSING_EXIF = 'missing_exif', // EXIF expected but not present
  PARSE_ERROR = 'parse_error', // Error during parsing
}

// ============================================================================
// CORE INTERFACES
// ============================================================================

/**
 * FileMetadata - Represents a file with its extracted metadata
 *
 * Purpose: Holds the original File object plus all extracted information
 * Used by: File upload handlers, parsing functions
 */
export interface FileMetadata {
  /** Original File object from browser File API */
  file: File

  /** Original filename (e.g., "01-15-2024.jpg") */
  originalName: string

  /** File extension including dot (e.g., ".jpg") */
  extension: string

  /** File size in bytes */
  size: number

  /** File MIME type (e.g., "image/jpeg") */
  type: string

  /** File last modified timestamp */
  lastModified: Date
}

/**
 * ParsedDate - Result of date extraction from a file
 *
 * Purpose: Captures the extracted date along with metadata about the extraction
 * Why separate from FileMetadata? Because parsing can fail, and we need to track
 * confidence/source for debugging and user feedback
 */
export interface ParsedDate {
  /** The extracted date, or null if parsing failed */
  date: Date | null

  /** Where the date came from (filename, EXIF, file system, manual) */
  source: DateSource

  /** Confidence level: 1.0 = certain, 0.0 = no confidence */
  confidence: number

  /** Original string that was parsed (for debugging) */
  originalString?: string

  /** Error message if parsing failed */
  error?: string
}

/**
 * RenameResult - Complete information about a file's rename operation
 *
 * Purpose: Combines file metadata, parsed date, and generated new filename
 * This is the main data structure that flows through the application
 */
export interface RenameResult {
  /** Unique identifier for this file (for React keys) */
  id: string

  /** Original file metadata */
  metadata: FileMetadata

  /** Parsed creation date */
  parsedDate: ParsedDate

  /** New filename (e.g., "2024-01-15.jpg" or "2024-01-15-01.jpg") */
  newFilename: string

  /** Processing status */
  status: FileStatus

  /** If problematic, what's the issue? */
  problem?: ProblemType

  /** Additional notes or warnings */
  notes?: string[]
}

/**
 * ProblematicFile - Simplified view of files that need user intervention
 *
 * Purpose: Used in UI to display files that couldn't be auto-processed
 * Why separate? UI needs simpler data structure than full RenameResult
 */
export interface ProblematicFile {
  /** Original filename */
  filename: string

  /** What went wrong */
  problem: ProblemType

  /** Human-readable explanation */
  reason: string

  /** Suggested action for user */
  suggestion?: string

  /** Reference to full file metadata if user wants to fix it */
  metadata: FileMetadata
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * CollisionMap - Tracks filename collisions to add sequence numbers
 *
 * Purpose: When multiple files have the same date, we need to add -01, -02, etc.
 * Key: base filename (e.g., "2024-01-15")
 * Value: count of files with this date (used to generate next sequence number)
 *
 * Example:
 * {
 *   "2024-01-15": 3  // Three files on this date: .jpg, -01.jpg, -02.jpg
 * }
 */
export type CollisionMap = Record<string, number>

/**
 * FileProcessingState - Application state for file processing
 *
 * Purpose: Manages the state of the entire file processing workflow
 * Used by: useFileProcessor hook (Step 7)
 */
export interface FileProcessingState {
  /** All files currently being processed */
  files: FileMetadata[]

  /** Results after parsing and rename generation */
  results: RenameResult[]

  /** Files that need user intervention */
  problematicFiles: ProblematicFile[]

  /** Is processing currently happening? */
  isProcessing: boolean

  /** Processing progress (0-100) */
  progress: number

  /** Any global errors */
  error: string | null
}

/**
 * DateParserOptions - Configuration for date parsing functions
 *
 * Purpose: Allows customization of date parsing behavior
 */
export interface DateParserOptions {
  /** Strict mode: reject ambiguous dates (e.g., 01-02-2024 could be Jan 2 or Feb 1) */
  strict?: boolean

  /** Preferred date format hint (helps with ambiguous dates) */
  preferredFormat?: 'MDY' | 'DMY' | 'YMD'

  /** Allow fallback to file system dates? */
  allowFileSystemFallback?: boolean
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard: Check if a file is a supported image type
 */
export function isSupportedImageType(file: File): boolean {
  const supportedTypes = ['image/jpeg', 'image/heic', 'image/heif']
  const supportedExtensions = ['.jpg', '.jpeg', '.heic', '.heif']

  const hasValidType = supportedTypes.includes(file.type.toLowerCase())
  const hasValidExtension = supportedExtensions.some((ext) =>
    file.name.toLowerCase().endsWith(ext)
  )

  return hasValidType || hasValidExtension
}

/**
 * Type guard: Check if ParsedDate is valid (date was successfully extracted)
 */
export function isValidParsedDate(
  parsed: ParsedDate
): parsed is ParsedDate & { date: Date } {
  return parsed.date !== null && parsed.date instanceof Date && !parsed.error
}

/**
 * Type guard: Check if RenameResult is successful (ready to rename)
 */
export function isSuccessfulRename(result: RenameResult): boolean {
  return result.status === FileStatus.SUCCESS && isValidParsedDate(result.parsedDate)
}

/**
 * Type guard: Check if RenameResult is problematic (needs user intervention)
 */
export function isProblematicRename(result: RenameResult): boolean {
  return result.status === FileStatus.PROBLEMATIC && result.problem !== undefined
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Extract return type from async function (useful for typing async operations)
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T

/**
 * Make specific properties of T optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Make specific properties of T required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
