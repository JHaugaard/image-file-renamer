# Image File Renamer - Project Brief

## Project Overview

Image File Renamer is a command-line utility that helps photographers organize their image libraries by automatically renaming JPEG and HEIC files to follow a consistent, sortable naming convention. The tool processes folders or individual files, extracts creation dates from filenames or image metadata, and renames files to YYYY-MM-DD format—the industry standard for chronological sorting. With a preview-confirm workflow and graceful handling of problematic files, users can confidently batch-rename hundreds of photos with minimal manual intervention.

---

## Problem Statement

Photographers often accumulate images with inconsistent naming conventions—some files use MM-DD-YYYY format, others have descriptive names, and some contain typos or malformed dates. This inconsistency makes it difficult to organize, sort, and locate photos chronologically. Manually renaming hundreds of files is time-consuming and error-prone.

**Why This Matters:**
- **Chronological Organization**: YYYY-MM-DD format enables automatic alphabetical sorting that matches temporal order
- **Batch Efficiency**: Processing 300+ files manually would take hours; automation reduces this to minutes
- **Data Preservation**: Extracting creation dates from metadata ensures no date information is lost, even when original filenames are corrupted or unclear

---

## Project Goals

### Primary Goal
Create a command-line tool that automatically renames image files to YYYY-MM-DD format with user confirmation before making any changes.

### Secondary Goals
- Handle edge cases gracefully by flagging problematic files for manual review
- Prevent filename collisions by adding sequence numbers when multiple files share the same date
- Preserve original file locations (rename in place, don't move files)
- Support both batch processing (folders) and single-file operations

---

## Functional Requirements

### Core Functionality

The tool operates as an interactive command-line utility that users invoke on a folder or single file. It performs three main operations: scanning, previewing, and renaming.

**Key Features:**

- **Batch File Processing**: Accept a folder path and process all JPEG and HEIC files within it
- **Single File Processing**: Accept an individual file path for renaming
- **Date Extraction**: Attempt to extract creation dates from multiple sources in order of preference:
  1. Parse filename for recognizable date patterns (e.g., MM-DD-YYYY, YYYY-MM-DD, etc.)
  2. Check file metadata (EXIF creation date for images)
  3. Use file system creation/modification date as fallback
- **Preview & Confirmation**: Display side-by-side before/after filenames and flag problematic files before any changes occur
- **Collision Prevention**: Append sequence numbers (01, 02, 03, etc.) to filenames when multiple files share the same creation date
- **Dry-Run Mode**: Allow users to preview changes without actually renaming files
- **Manual Override**: Provide interactive workflow for users to manually specify correct dates for problematic files
- **Summary Report**: Display summary statistics after operation completes (X files renamed, X skipped, X problematic)

### User Experience Expectations

Users should be able to run the tool from their terminal with a simple command, review what will happen before committing to changes, and have clear feedback about the results. The tool should handle edge cases without crashing and offer helpful suggestions for files it cannot automatically process.

---

## Success Criteria

**Essential Success Metrics:**

1. **Batch Renaming**: Successfully rename 28+ out of 31 files in test case (90%+ success rate with graceful fallback for problematic files)
2. **Date Accuracy**: All renamed files reflect accurate creation dates (either from filename, metadata, or user manual input)
3. **Filename Uniqueness**: All resulting filenames are unique (no duplicates; sequence numbers applied where needed)
4. **Zero Data Loss**: Original files are never deleted or corrupted; renaming is atomic and safe
5. **User Confirmation**: No files are renamed without explicit user approval of the preview

**User Satisfaction Indicators:**
- Tool completes processing in under 5 seconds for typical folder (300 files)
- Error messages clearly explain why specific files couldn't be renamed automatically
- User can complete the workflow from CLI without needing external tools

---

## Use Cases & Scenarios

### Use Case 1: Batch Rename Photo Archive
**Scenario**: A photographer has 366 photos named in MM-DD-YYYY format (e.g., "01-15-2024.jpg") that need to be reorganized into YYYY-MM-DD format.

**Expected behavior**:
- User runs: `rename-images /path/to/photo-archive`
- Tool scans all 366 files
- Tool displays preview: "Found 366 JPEG files. Before/After names shown"
- User reviews preview and confirms operation
- Tool renames all files to "2024-01-15.jpg" format
- Tool displays summary: "Successfully renamed 366 files"

### Use Case 2: Handle Mixed Formats and Edge Cases
**Scenario**: A folder contains 31 files with inconsistent naming—some in MM-DD-YYYY, some with typos, some with no date info, and some unnamed.

**Expected behavior**:
- Tool scans folder and identifies problematic files
- Preview shows before/after names AND flags 3 problematic files with reasons
- User decides: "Proceed with 28 auto-renamed files?"
- Tool completes renaming for 28 files
- Tool displays problematic files with options for manual correction
- User manually provides dates for 3 problematic files through interactive prompts
- Final summary: "28 auto-renamed, 3 manually corrected, 0 failed"

### Use Case 3: Dry-Run Preview
**Scenario**: User wants to see what would happen without making actual changes.

**Expected behavior**:
- User runs: `rename-images /path/to/photos --dry-run`
- Tool displays full before/after preview
- No files are actually renamed
- User can review and plan for actual operation

### Use Case 4: Single File Rename
**Scenario**: User needs to rename one miscellaneous photo file.

**Expected behavior**:
- User runs: `rename-images /path/to/photo.jpg`
- Tool processes single file, shows before/after
- User confirms
- File is renamed

---

## Edge Cases to Handle

### Filename Parsing Failures
**Problem**: Filename contains unrecognizable date format (e.g., "photo_xyz.jpg" or "scan_corrupted.jpg")
**Solution**: Flag file as problematic, attempt metadata extraction, offer user manual date entry

### Duplicate Dates
**Problem**: Multiple files have the same creation date (e.g., 10 photos taken on same day)
**Solution**: Append sequence numbers: "2024-01-15-01.jpg", "2024-01-15-02.jpg", etc.

### No Date Information Available
**Problem**: Filename has no recognizable date and metadata is absent or corrupt
**Solution**: Flag for user intervention; allow manual date specification or skip option

### File Permission Issues
**Problem**: User lacks write permissions on target directory
**Solution**: Display clear error message and abort before attempting any changes

### Filename Collisions with Existing Files
**Problem**: Renamed filename already exists in directory
**Solution**: Increment sequence number; notify user in final report

### Non-Image Files Mixed In
**Problem**: Folder contains non-JPEG/HEIC files (documents, videos, etc.)
**Solution**: Skip non-image files silently and only process supported formats

---

## Constraints & Assumptions

### Constraints
- **File Types**: Initial version processes JPEG and HEIC files only
- **Naming Pattern**: Output format is YYYY-MM-DD only; no custom patterns in v1
- **File Location**: Files are renamed in place (no moving or copying)
- **Frequency**: Tool is used infrequently (1-2 times per photography project)

### Assumptions
- Users have basic command-line familiarity
- Users own the files they're renaming (have write permissions)
- Creation dates in metadata are reasonably accurate
- Filenames, if they contain dates, use recognizable formats (MM-DD-YYYY, YYYY-MM-DD, etc.)

---

## Out of Scope (For Initial Version)

The following features are explicitly not included in v1:

- Custom naming patterns (e.g., YYYY_MM_DD, YYYY.MM.DD formats)
- Recursive subfolder processing (flat folder only)
- Moving or copying files to new locations
- Organizing files by date ranges or creating date-based folders
- GUI interface (CLI only)
- Batch editing of metadata
- Integration with photo management software (Lightroom, Photos, etc.)
- Support for video files or RAW formats

These can be considered for future iterations based on user feedback.

---

## Learning Goals

**What I Want to Learn:**
- How to design and build a practical CLI tool that solves a real problem
- Understanding of metadata extraction from image files (EXIF data)
- Best practices for file system operations and safe file renaming
- CLI design patterns for user confirmation workflows and error handling
- How this project structure feeds into a broader Claude Skills workflow (tech-stack-advisor → hosting-advisor → project-starter)

**Skills to Practice:**
- End-to-end project planning from problem to implementation
- Breaking down a real-world task into technical requirements
- Designing user workflows that prioritize safety and clarity

---

## Initial Tech Thoughts

(Captured from user but not requirements—tech-stack-advisor will help explore these options)

- Command-line tool that users invoke from terminal
- Support for processing folders and single files
- Dry-run flag for preview-only mode
- Interactive prompts for manual filename corrections

---

## Next Steps

**Recommended workflow:**

1. **Review this brief** — Ensure it accurately captures your vision
2. **Invoke tech-stack-advisor skill** — Explore technology options for building this CLI tool
3. **Invoke hosting-advisor skill** — Determine how users will install and run this tool
4. **Invoke project-starter skill** — Create project foundation with learning roadmap

Ready to proceed with tech-stack-advisor to explore implementation approaches?
