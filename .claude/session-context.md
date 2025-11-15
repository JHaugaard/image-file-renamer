# Image File Renamer - Tech Stack Session Context

## Project Overview
A web-based image file renaming utility that allows users to:
- Drag and drop image files (JPEG, HEIC)
- Extract creation dates from filenames, EXIF metadata, or file system
- Preview new YYYY-MM-DD naming convention
- Download renamed files (client-side, no server upload)

**Key Characteristic**: All processing happens in the browser. No backend required.

---

## Scope & User Context
- **Users**: Personal use (single user)
- **Hosting**: ✅ DECIDED - Cloudflare Pages (see docs/deployment-decision.md)
- **Deployment**: Static site deployment via GitHub → Cloudflare Pages
- **Timeline**: Learning pace (weeks, education priority)

---

## Tech Stack Decision: PRIMARY RECOMMENDATION

### Selected Stack
**React (Vite) + Client-Side Processing**

### Core Components
```
Frontend:     React 18 + TypeScript (Vite)
Build Tool:   Vite
Styling:      Tailwind CSS + shadcn/ui
Image Parsing: piexifjs or sharp-wasm (EXIF extraction)
State Mgmt:   React hooks (useState, useCallback) + Context API
File Handling: Web File API, Blob, ArrayBuffer
Testing:      Vitest + React Testing Library
Deployment:   Cloudflare Pages (free tier, unlimited bandwidth)
```

### Why This Stack

**Project Fit:**
- ✅ Client-side processing eliminates need for backend
- ✅ Drag-drop UX natively supported in React
- ✅ File API and metadata extraction work entirely in browser
- ✅ Fast development: MVP in 2-3 weeks
- ✅ Zero complexity for "simple" requirement

**Learning Value:**
- Modern React patterns (hooks, components, state management)
- Web APIs: File API, Blob handling, EXIF data extraction
- TypeScript in real-world code
- Component-driven architecture
- Client-side file processing (when/why to use it)
- Understanding when backend is NOT needed

**Infrastructure Alignment:**
- Static site hosting on Cloudflare Pages ($0/month)
- Integrates with existing Cloudflare DNS setup
- Global CDN for fast performance worldwide
- Zero backend maintenance burden
- Scales naturally (no server load, unlimited bandwidth)

---

## Key Architectural Decisions

### Why Client-Side Processing?
1. **Privacy**: Files never leave user's computer
2. **Speed**: No upload latency, instant processing
3. **Simplicity**: No server infrastructure needed
4. **Cost**: Hosted as static site (minimal cost)
5. **User Experience**: Drag-drop + preview + download in one flow

### What Gets Built
- **Frontend**: React component UI with drag-drop, preview table, download button
- **Business Logic**: Filename parser (regex for date extraction), date formatting, collision detection
- **File Handling**: EXIF reader, Blob creation, filename generation
- **Testing**: Unit tests for parsing/collision logic, integration tests for UI flow

### What Does NOT Get Built (v1)
- Backend server
- Database
- User authentication
- Processing history/persistence
- Multiple file format support beyond JPEG/HEIC

---

## Learning Outcomes

### Frontend Skills
- React component architecture and hooks
- Managing complex UI state (file uploads, previews, progress)
- TypeScript in practice
- Tailwind CSS utility-based styling
- Component composition and reusability

### Web Platform Skills
- File API deep dive
- Reading file metadata (EXIF, creation date)
- Binary file handling and ArrayBuffer
- Creating downloadable files client-side
- Drag-drop UX implementation

### Architecture Concepts
- Client vs. Server: When to process where
- State management in React (hooks + Context)
- Separation of concerns (UI vs. business logic)
- Testing patterns for file handling

---

## Development Environment Context

### Available Infrastructure
- Mac (MacBook Pro + Mac Mini)
- VS Code with extensions
- Docker Desktop (optional for this project)
- Git workflow (main + dev branches, conventional commits)
- Hostinger VPS available (but not needed for static site)

### Development Speed
- Learning curve: 🟡 Medium (3-4 weeks to proficiency)
- MVP timeline: 🟢 Fast (2-3 weeks)
- First functional version should be achievable in 2-3 weeks

### Cost Profile
- Initial setup: $0 (all tools free)
- Monthly hosting: $0 (Cloudflare Pages free tier)
- No external services required
- Development tools: VS Code, Node.js, npm (all free)
- Total monthly cost: $0

---

## Alternatives Considered

### Alternative 1: Astro + Minimal JavaScript
**Pros**: Simpler, smaller bundle, less JavaScript
**Cons**: Less transferable learning, fewer UI components, manual state management
**Decision**: Rejected in favor of React for broader learning value

### Alternative 2: Next.js Full-Stack
**Pros**: Future-proof for backend features, unified codebase
**Cons**: Unnecessary complexity for v1, higher hosting costs, overkill for client-side processing
**Decision**: Rejected; can add backend later if needed

### Alternative 3: Vue/Laravel
**Pros**: Alternative tech stack
**Cons**: Over-engineered, adds unnecessary backend complexity, doesn't align with "simple, client-side" goal
**Decision**: Ruled out

---

## Deployment Decision: ✅ COMPLETED

**Decision**: Cloudflare Pages (Free Tier)

**Rationale**:
- $0/month with unlimited bandwidth
- Global CDN for fast performance worldwide
- Automatic builds and deployments from GitHub
- Integrates seamlessly with existing Cloudflare DNS
- Zero maintenance burden (fully managed)
- Perfect for static React + Vite sites

**Deployment Workflow**:
1. Push code to GitHub (main branch)
2. Cloudflare Pages automatically builds (npm run build)
3. Site deploys globally in 1-2 minutes
4. Rollback via Cloudflare UI if needed

**Alternatives Considered**:
- Netlify: Similar, but 100GB bandwidth limit
- Vercel: Great for Next.js, bandwidth limits
- Hostinger VPS: More maintenance, learning opportunity
- GitHub Pages: No build automation for Vite

**Full Details**: See [docs/deployment-decision.md](docs/deployment-decision.md)

---

## Project Spinup: ✅ COMPLETED

**Status**: ✅ Foundation created via project-spinup skill (Guided Setup mode)

**Spinup Approach**: **Guided Setup** (12-step incremental learning path)

### What Was Generated

✅ **[claude.md](../claude.md)** - Comprehensive project context with 12-step guided setup
- Complete development workflow documentation
- 12 detailed learning steps with explanations
- Code conventions and best practices
- Troubleshooting guide
- Deployment instructions

✅ **[docker-compose.yml](../docker-compose.yml)** - Optional containerized dev environment
✅ **Directory structure** - src/, tests/{unit,components,integration}/, docs/, public/
✅ **[.gitignore](../.gitignore)** - Node.js/React/Vite appropriate
✅ **[.env.example](../.env.example)** - Environment variable template
✅ **[README.md](../README.md)** - Quick start and setup instructions
✅ **[package.json](../package.json)** - Dependencies and scripts configured

### Project Foundation Files

```
image-file-renamer/
├── claude.md              ← MAIN REFERENCE: Read this for guided setup
├── README.md              ← Quick start guide
├── package.json           ← React 18, Vite, TypeScript, Tailwind, Vitest
├── docker-compose.yml     ← Optional Docker dev environment
├── .gitignore
├── .env.example
├── src/                   ← Source code (empty, ready for Step 1)
├── tests/                 ← Tests (unit/, components/, integration/)
│   ├── unit/
│   ├── components/
│   └── integration/
├── docs/                  ← Project documentation
│   ├── image-renamer-brief.md
│   ├── tech-stack-decision.md
│   └── deployment-decision.md
└── public/                ← Static assets
```

### Git Repository Status

**Not yet initialized** - User should run:
```bash
cd /Volumes/dev/develop-sandbox/image-file-renamer
git init
git checkout -b main
git add .
git commit -m "chore: initial project setup via project-spinup skill"
git checkout -b dev
```

---

## Guided Setup: 12-Step Learning Path

The project is ready for incremental development. All steps are documented in [claude.md](../claude.md) under "Next Steps (Guided Setup)".

### Step-by-Step Overview

1. **Initialize Vite + React + TypeScript** (~20 min)
   - Create vite.config.ts, tsconfig.json, Tailwind config, ESLint, Prettier
   - Set up initial React app structure

2. **Set Up TypeScript Types** (~15 min)
   - Define FileMetadata, ParsedDate, RenameResult interfaces
   - Create type-safe application structure

3. **Implement Date Parsing Logic** (~45 min)
   - Build filenameParser.ts (regex patterns)
   - Build exifParser.ts (EXIF metadata extraction)
   - Build fallbackParser.ts (file system dates)
   - Write unit tests (TDD approach)

4. **Implement Filename Generation** (~30 min)
   - Build filenameGenerator.ts (YYYY-MM-DD format)
   - Build collisionDetector.ts (sequence numbers for duplicates)
   - Write unit tests

5. **Create File Upload Components** (~45 min)
   - Build DragDropZone.tsx (drag-drop with visual feedback)
   - Build FileInput.tsx (traditional file picker)
   - Style with Tailwind CSS

6. **Create Preview Table** (~45 min)
   - Build PreviewTable.tsx (before/after table)
   - Build FileRow.tsx (individual file preview)
   - Build ProblematicFileRow.tsx (error display)

7. **Implement File Processing Hook** (~60 min)
   - Create useFileProcessor.ts custom hook
   - Orchestrate parsing, generation, collision detection
   - Manage complex state with useReducer

8. **Create Download Components** (~30 min)
   - Build DownloadButton.tsx
   - Build CancelButton.tsx
   - Implement Blob creation and download logic

9. **Assemble Application** (~30 min)
   - Build Header.tsx and Footer.tsx
   - Wire up all components in App.tsx
   - Complete user flow

10. **Add Integration Tests** (~45 min)
    - Test complete workflow
    - Add error boundaries
    - Improve error handling

11. **Optimize Performance & Accessibility** (~30 min)
    - Add useMemo/useCallback optimizations
    - Ensure keyboard navigation
    - Add ARIA labels
    - Run Lighthouse audit

12. **Documentation & Deployment Prep** (~30 min)
    - Finalize README
    - Add code comments
    - Create deployment checklist
    - Build production bundle

**Total Time**: 6-8 hours spread across multiple sessions

### First Prompt for New Session

When starting a new session, copy this prompt to Claude Code:

```
Set up the Vite + React + TypeScript project structure as specified in claude.md. Include Tailwind CSS configuration, ESLint, Prettier, and Vitest. Please explain the purpose of each major configuration file as you create them.
```

This corresponds to **Step 1** in the guided setup.

---

## Summary

**Tech Stack**: React 18 + Vite + TypeScript for a modern, learning-focused web app that processes images entirely client-side.

**Deployment**: Cloudflare Pages for zero-cost, globally-distributed static site hosting with automatic builds from GitHub.

**Development Approach**: Guided Setup (12 incremental steps with explanations)

**Skills Workflow Status**:
- ✅ Phase 0: project-brief-writer
- ✅ Phase 1: tech-stack-advisor
- ✅ Phase 2: deployment-advisor
- ✅ Phase 3: project-spinup ← **JUST COMPLETED**

**Current Status**: 🚀 **Steps 1-3 COMPLETE, ready for Step 4**

**Completed Steps**:
- ✅ Step 1: Vite + React + TypeScript project initialized
- ✅ Step 2: TypeScript type system created
- ✅ Step 3: Date parsing logic implemented with TDD

**Next Action**: Continue with Step 4 - Implement filename generation & collision detection

**Main Reference**: [claude.md](../claude.md) - Contains all 12 steps with detailed instructions, learning objectives, and verification steps.

---

## Development Progress Tracker

### ✅ Step 1: Initialize Vite + React + TypeScript (COMPLETE)

**Created Files**:
- `vite.config.ts` - Vite configuration with React plugin, test setup
- `tsconfig.json` - Strict TypeScript configuration for app code
- `tsconfig.node.json` - TypeScript config for Node.js files (with composite: true)
- `tailwind.config.js` + `postcss.config.js` - Tailwind CSS setup
- `eslint.config.js` - ESLint with React and TypeScript rules
- `.prettierrc` - Code formatting configuration
- `index.html` - HTML entry point
- `src/main.tsx` - React entry point with StrictMode
- `src/App.tsx` - Root component (placeholder)
- `src/index.css` - Global styles with Tailwind directives
- `tests/setup.ts` - Vitest test environment setup

**Verification**:
- ✅ TypeScript type-check passes
- ✅ ESLint passes with no warnings
- ✅ Prettier formatting applied
- ✅ Production build successful (391ms)
- ✅ Vitest configured and ready

**Key Learnings**:
- Vite configuration for React HMR and testing
- TypeScript strict mode and project references
- ESLint + Prettier integration
- Modern React 18 patterns (createRoot, StrictMode)

### ✅ Step 2: Set Up TypeScript Types (COMPLETE)

**Created Files**:
- `src/types/index.ts` (217 lines) - Complete type system
  - Enums: `DateSource`, `FileStatus`, `ProblemType`
  - Interfaces: `FileMetadata`, `ParsedDate`, `RenameResult`, `ProblematicFile`
  - Utility types: `CollisionMap`, `FileProcessingState`, `DateParserOptions`
  - Type guards: `isSupportedImageType`, `isValidParsedDate`, `isSuccessfulRename`, `isProblematicRename`
- `src/types/examples.ts` - Practical usage examples and documentation

**Type System Design**:
- Models complete workflow: File → Parse → Generate → Result
- `Date | null` forces explicit null handling
- Enums provide type-safe constants
- Type guards enable runtime type narrowing
- Separation of concerns (data vs behavior)

**Verification**:
- ✅ All types compile successfully
- ✅ ESLint passes
- ✅ Examples demonstrate type usage

**Key Learnings**:
- Type system design for domain logic
- When to use interface vs type vs enum
- Type guards for runtime safety
- Making illegal states unrepresentable

### ✅ Step 3: Implement Date Parsing Logic (COMPLETE)

**Created Files**:
- `src/lib/parsers/filenameParser.ts` - RegEx-based date extraction from filenames
- `src/lib/parsers/exifParser.ts` - EXIF metadata extraction using exifr library
- `src/lib/parsers/fallbackParser.ts` - File system date fallback (lastModified)
- `tests/unit/filenameParser.test.ts` - 26 tests for filename parsing
- `tests/unit/exifParser.test.ts` - 11 tests for EXIF parsing
- `tests/unit/fallbackParser.test.ts` - 11 tests for fallback parsing

**Installed Dependencies**:
- `exifr` (^7.1.3) - Modern EXIF parsing library for JPEG/HEIC images

**Test Results**:
- ✅ All 48 tests passing (3 test files)
- ✅ 100% test coverage for parsing logic
- ✅ TDD approach: tests written first, then implementation

**Parsing Strategy Implemented**:
1. **Filename Parser** (Priority 1):
   - YYYY-MM-DD formats (confidence: 1.0)
   - YYYYMMDD without separators (confidence: 1.0)
   - MM-DD-YYYY / DD-MM-YYYY with disambiguation (confidence: 0.8)
   - MM-DD-YY two-digit year (confidence: 0.6)
   - Supports separators: `-`, `/`, `_`
   - Real-world patterns: iPhone, Android, Screenshots

2. **EXIF Parser** (Priority 2):
   - Reads DateTimeOriginal (highest priority)
   - Falls back to CreateDate, DateTime, ModifyDate
   - Confidence: 0.9 (EXIF can be edited)
   - Handles EXIF date format: "YYYY:MM:DD HH:MM:SS"

3. **Fallback Parser** (Priority 3):
   - Uses File.lastModified timestamp
   - Confidence: 0.5 (file dates unreliable)
   - Always succeeds (File objects always have lastModified)

**Verification**:
- ✅ All unit tests pass
- ✅ RegEx patterns tested with edge cases
- ✅ Timezone handling verified
- ✅ Invalid date rejection working
- ✅ Leap year validation working

**Key Learnings**:
- Test-Driven Development (TDD) workflow
- RegEx pattern design for date matching
- Priority-based parsing strategies
- EXIF metadata extraction from images
- Confidence scoring for ambiguous data
- Timezone handling in JavaScript Date objects
- Pure functions for testability

---

## Current Project Structure

```
image-file-renamer/
├── src/
│   ├── types/
│   │   ├── index.ts           ✅ Complete type system
│   │   └── examples.ts        ✅ Usage documentation
│   ├── lib/
│   │   └── parsers/
│   │       ├── filenameParser.ts  ✅ RegEx date extraction
│   │       ├── exifParser.ts      ✅ EXIF metadata reading
│   │       └── fallbackParser.ts  ✅ File system dates
│   ├── App.tsx                ✅ Placeholder component
│   ├── main.tsx               ✅ React entry point
│   └── index.css              ✅ Global styles + Tailwind
├── tests/
│   ├── setup.ts               ✅ Vitest configuration
│   ├── unit/
│   │   ├── filenameParser.test.ts ✅ 26 tests passing
│   │   ├── exifParser.test.ts     ✅ 11 tests passing
│   │   └── fallbackParser.test.ts ✅ 11 tests passing
│   ├── components/            ⏳ Ready for Steps 5-6
│   └── integration/           ⏳ Ready for Step 10
├── public/
│   └── vite.svg               ✅ Vite logo
├── docs/
│   ├── image-renamer-brief.md
│   ├── tech-stack-decision.md
│   └── deployment-decision.md
├── index.html                 ✅ HTML entry
├── vite.config.ts             ✅ Vite config
├── tsconfig.json              ✅ TS config (app)
├── tsconfig.node.json         ✅ TS config (Node)
├── tailwind.config.js         ✅ Tailwind config
├── postcss.config.js          ✅ PostCSS config
├── eslint.config.js           ✅ ESLint config
├── .prettierrc                ✅ Prettier config
├── package.json               ✅ Dependencies installed (481 packages)
├── docker-compose.yml         ✅ Optional Docker dev
├── .gitignore                 ✅ Git ignore rules
├── .env.example               ✅ Env var template
├── README.md                  ✅ Setup guide
└── claude.md                  ✅ Main reference
```

---

## Next Step: Step 4 - Implement Filename Generation & Collision Detection

**Prompt to use**:
```
Implement filename generation in src/lib/generators/ as specified in claude.md. Create filenameGenerator.ts (YYYY-MM-DD format) and collisionDetector.ts (add sequence numbers for duplicates). Write unit tests demonstrating collision handling. Explain the collision detection algorithm.
```

**What will be created**:
- `src/lib/generators/filenameGenerator.ts` - Generate YYYY-MM-DD.ext filenames
- `src/lib/generators/collisionDetector.ts` - Detect duplicates, add -01, -02, etc.
- `tests/unit/filenameGenerator.test.ts` - Unit tests
- `tests/unit/collisionDetector.test.ts` - Collision scenarios

**Estimated time**: ~30 minutes

**Focus**: Pure functions, algorithm design, edge case handling (duplicate dates)
