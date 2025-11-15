# Image File Renamer

> A client-side web application for batch renaming JPEG and HEIC image files to YYYY-MM-DD format with preview-confirm workflow and graceful edge case handling.

**Status**: 🚧 Active Development | **Developer**: John | **Philosophy**: Learning-Focused, Best Practices

---

## Developer Profile

**Name**: John

**Experience Level**: Hobbyist developer with learning goals focused on:
- Deep understanding of full-stack architecture
- Solid development techniques and professional practices
- Mastering the React + TypeScript ecosystem
- Building production-ready client-side applications
- Understanding modern web platform APIs (File API, EXIF parsing, Blob handling)

**Development Approach**:
- Heavy reliance on Claude Code for implementation, debugging, and architectural decisions
- Iterative, deliberative approach over one-shot solutions
- Emphasis on understanding WHY, not just WHAT
- Conventional commits, main+dev git workflow
- Testing from the start

**Common Tasks for Claude Code**:
- Feature implementation following React best practices
- Debugging and troubleshooting
- Code refactoring and optimization
- Writing tests (unit, integration, E2E)
- Performance optimization
- Understanding component architecture and state management
- Learning Web Platform APIs

---

## Project Overview

### What This Project Does

Image File Renamer helps photographers organize their image libraries by automatically renaming JPEG and HEIC files to follow a consistent, sortable YYYY-MM-DD naming convention.

**Key Features**:
- **Drag-and-drop file upload** - Intuitive UI for selecting files
- **Intelligent date extraction** - Parses filenames, EXIF metadata, and file system dates
- **Preview before renaming** - Side-by-side before/after table with confirmation
- **Collision detection** - Automatically adds sequence numbers (01, 02, 03) for duplicate dates
- **Problematic file handling** - Flags files that can't be auto-processed with clear reasons
- **Client-side processing** - All operations happen in browser, files never leave user's computer
- **Batch download** - Download all renamed files as a zip or individually
- **Privacy by design** - Zero server upload, complete data privacy

**Use Case**: Process 300+ photos with inconsistent naming (MM-DD-YYYY, descriptive names, typos) and rename them all to YYYY-MM-DD format for chronological sorting.

### Tech Stack

**Frontend**: React 18 + TypeScript (strict mode)
**Build Tool**: Vite 5.x (fast HMR, optimized builds)
**Styling**: Tailwind CSS 3.x + shadcn/ui components
**State Management**: React hooks (useState, useCallback, useReducer) + Context API
**File Parsing**: piexifjs or exif-js (EXIF extraction from images)
**File Handling**: Web File API, Blob, ArrayBuffer
**Testing**: Vitest + React Testing Library
**Linting**: ESLint + Prettier
**Deployment**: Cloudflare Pages (static hosting, $0/month)
**Development**: Docker (optional containerized dev environment)

### Architecture Decisions

**Why Client-Side Processing?**
- **Privacy**: User files never leave their browser - critical for personal photos
- **Speed**: Instant processing without network upload/download delays
- **Cost**: No backend needed = $0/month hosting on Cloudflare Pages
- **Simplicity**: Single-page app, no server management, no database

**Why React + Vite?**
- **React**: Most in-demand frontend framework, excellent for complex UI state (file previews, validation, errors)
- **TypeScript**: Type safety catches bugs early, especially important for file handling and binary data
- **Vite**: Lightning-fast dev experience with HMR, modern build tooling
- **Learning Value**: Transferable skills to job market and other projects

**Why Cloudflare Pages?**
- **Free**: Unlimited bandwidth, no cost scaling
- **Fast**: Global CDN edge network
- **Simple**: Git push = automatic deployment
- **Integration**: Already using Cloudflare DNS

For complete rationale, see [docs/tech-stack-decision.md](./docs/tech-stack-decision.md) and [docs/deployment-decision.md](./docs/deployment-decision.md).

---

## Development Environment

### Computers & Sync
- **Primary Machines**: MacBook Pro and Mac Mini (equal usage)
- **Code Sync**: GitHub repository + portable SSD
- **Documents**: iCloud Documents folder (non-code files)
- **IDE**: VS Code with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - React DevTools (browser extension)

### Local Development Setup

#### Prerequisites
- **Node.js**: v18 or v20 (LTS recommended)
- **npm**: v9+ (comes with Node.js)
- **Git**: Configured with conventional commits
- **Docker Desktop**: (Optional) For containerized development
- **Modern Browser**: Chrome, Firefox, or Safari (latest version) for testing

#### First-Time Setup

**This project uses Guided Setup** - You'll build out the structure incrementally with Claude Code's help. See the "Next Steps (Guided Setup)" section below for detailed step-by-step instructions.

**After completing guided setup**, your development workflow will be:

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
# Vite will hot-reload on file changes

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Infrastructure & Hosting

### Self-Hosted Infrastructure (Available)

John maintains a self-hosted infrastructure suite on Hostinger VPS(s):

- **Supabase** (self-hosted): PostgreSQL, Auth, Storage, Realtime, API
- **n8n**: Workflow automation
- **Ollama**: Local LLM inference for AI features
- **Redis**: Caching and sessions
- **Nginx**: Reverse proxy and SSL termination
- **PostgreSQL**: General database use
- **Wiki.js**: Documentation and knowledge base platform

**Note for this project**: This project does NOT use backend infrastructure - it's entirely client-side. However, the infrastructure is available if future versions need server-side features (user accounts, saved rename history, etc.).

### Project-Specific Hosting

**Deployment Target**: Cloudflare Pages (static site hosting)
**DNS**: Cloudflare nameservers (for all domains)
**SSL**: Automatic (Cloudflare managed)
**Cost**: $0/month (free tier, unlimited bandwidth)

### Deployment Workflow

1. **Develop locally** on `dev` branch
2. **Push to GitHub** when ready
3. **Create PR**: `dev` → `main`
4. **Merge PR**
5. **Automatic deployment**: Cloudflare detects push to `main` and deploys in 1-2 minutes

**Rollback**: Via Cloudflare Pages dashboard (30-second rollback to any previous deployment)

See [docs/deployment-decision.md](./docs/deployment-decision.md) for complete deployment strategy.

---

## Development Workflow

### Git Branching Strategy

- **main**: Production-ready code, auto-deploys to Cloudflare Pages
- **dev**: Active development branch
- **feature/***: Feature branches (branch from dev, merge back to dev)
- **fix/***: Bug fix branches

### Commit Convention

Follow conventional commits format:

```
feat: add drag-and-drop file upload component
fix: resolve EXIF date parsing for HEIC files
docs: update README with deployment steps
test: add unit tests for filename parser
refactor: improve collision detection performance
style: format code with Prettier
chore: update dependencies
```

### Development Cycle

1. **Create feature branch**: `git checkout -b feature/feature-name`
2. **Make small, focused changes**: Commit frequently
3. **Write tests**: Test as you build (TDD when possible)
4. **Manual testing**: Verify in browser
5. **Commit**: Use conventional format
6. **Push**: `git push origin feature/feature-name`
7. **When complete**: Merge to dev, test, then merge to main for deployment

### Testing Strategy

**Unit Tests**: Test pure functions (date parsers, filename generators, collision detectors)
**Component Tests**: Test React components with React Testing Library
**Integration Tests**: Test full workflows (file upload → parse → preview → download)

Run tests:
```bash
# Run all tests once
npm run test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

**Testing Philosophy**:
- Test business logic thoroughly (parsing, validation, collision detection)
- Test component behavior, not implementation details
- Focus on user interactions and edge cases

---

## Code Conventions

### File Organization

```
image-file-renamer/
├── src/
│   ├── components/          # React components
│   │   ├── FileUpload/
│   │   │   ├── DragDropZone.tsx
│   │   │   └── FileInput.tsx
│   │   ├── Preview/
│   │   │   ├── PreviewTable.tsx
│   │   │   ├── FileRow.tsx
│   │   │   └── ProblematicFileRow.tsx
│   │   ├── Actions/
│   │   │   ├── DownloadButton.tsx
│   │   │   └── CancelButton.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── lib/                 # Business logic (pure functions)
│   │   ├── parsers/
│   │   │   ├── filenameParser.ts
│   │   │   ├── exifParser.ts
│   │   │   └── fallbackParser.ts
│   │   ├── generators/
│   │   │   ├── filenameGenerator.ts
│   │   │   └── collisionDetector.ts
│   │   ├── validators/
│   │   │   ├── fileTypeValidator.ts
│   │   │   └── dateValidator.ts
│   │   └── utils/
│   │       ├── downloadFiles.ts
│   │       └── fileHelpers.ts
│   ├── hooks/               # Custom React hooks
│   │   ├── useFileProcessor.ts
│   │   └── useFileUpload.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles (Tailwind)
├── tests/                   # All tests mirror src/ structure
│   ├── unit/
│   │   ├── filenameParser.test.ts
│   │   ├── collisionDetector.test.ts
│   │   └── ...
│   ├── components/
│   │   ├── DragDropZone.test.tsx
│   │   └── ...
│   └── integration/
│       └── fileProcessingFlow.test.tsx
├── docs/                    # Project documentation
│   ├── image-renamer-brief.md
│   ├── tech-stack-decision.md
│   └── deployment-decision.md
├── public/                  # Static assets
├── docker-compose.yml       # Local dev environment (optional)
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── .eslintrc.cjs            # ESLint configuration
├── .prettierrc              # Prettier configuration
├── .gitignore
├── package.json
├── README.md
└── claude.md                # This file
```

### Naming Conventions

**Files**:
- Components: PascalCase (e.g., `DragDropZone.tsx`)
- Utilities/libs: camelCase (e.g., `filenameParser.ts`)
- Tests: Same as source file + `.test.ts` (e.g., `filenameParser.test.ts`)
- Types: `index.ts` or descriptive name (e.g., `fileTypes.ts`)

**Variables & Functions**:
- camelCase: `const fileName = ...`, `function parseDate() { ... }`
- React components: PascalCase: `function DragDropZone() { ... }`
- Types/Interfaces: PascalCase: `interface FileMetadata { ... }`
- Constants: UPPER_SNAKE_CASE: `const MAX_FILE_SIZE = ...`

**React Conventions**:
- Use functional components (not class components)
- Use hooks (useState, useEffect, useCallback, etc.)
- Custom hooks start with `use`: `useFileProcessor`
- Props interfaces end with `Props`: `interface DragDropZoneProps { ... }`

### Code Style

**Linting & Formatting**:
- ESLint for code quality (React, TypeScript, accessibility rules)
- Prettier for consistent formatting
- Run on save (configure in VS Code)
- Pre-commit hooks ensure code quality

**React Best Practices**:
- Keep components small and focused (single responsibility)
- Extract business logic to `lib/` (components handle UI, libs handle logic)
- Use TypeScript strictly (no `any` types)
- Prefer composition over inheritance
- Use meaningful prop names and component names

**TypeScript Best Practices**:
- Enable strict mode
- Define explicit return types for functions
- Use interfaces for object shapes
- Use type for unions/intersections
- Avoid `any`, use `unknown` if truly unknown

---

## Common Commands

### Development
```bash
# Start development server (Vite HMR)
npm run dev
# → http://localhost:5173

# Build for production
npm run build
# → Creates optimized build in dist/

# Preview production build locally
npm run preview
# → Serves dist/ folder

# Type check (no emit, just check types)
npm run type-check
```

### Testing
```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test tests/unit/filenameParser.test.ts
```

### Code Quality
```bash
# Lint code
npm run lint

# Lint and auto-fix
npm run lint:fix

# Format code with Prettier
npm run format

# Format check (CI mode)
npm run format:check
```

### Docker (Optional)
```bash
# Start containerized development environment
docker compose up -d

# View logs
docker compose logs -f

# Stop containers
docker compose down

# Rebuild after package.json changes
docker compose up --build -d
```

---

## Project-Specific Notes

### File Handling & Privacy

**Client-Side Processing**: All file operations happen in the browser using the Web File API. Files are:
1. Selected by user (drag-drop or file picker)
2. Read into memory as `File` objects
3. Parsed for metadata (EXIF) using ArrayBuffer
4. Renamed in memory (original files unchanged)
5. Downloaded as new files (via Blob URLs)

**Privacy Guarantee**: Files NEVER leave the user's browser. No server upload, no tracking of file content.

### Date Extraction Strategy

The app attempts to extract creation dates in this order:

1. **Filename parsing**: Look for recognizable patterns (MM-DD-YYYY, YYYY-MM-DD, etc.)
2. **EXIF metadata**: Read `DateTimeOriginal` or `CreateDate` from image EXIF
3. **File system dates**: Use file `lastModified` as fallback
4. **Manual input**: Flag for user to manually specify date

### Collision Handling

When multiple files have the same date:
- First file: `2024-01-15.jpg`
- Second file: `2024-01-15-01.jpg`
- Third file: `2024-01-15-02.jpg`
- Etc.

Sequence numbers start at `01` (not `1`) for consistent sorting.

### Edge Cases

**Handled gracefully**:
- Unrecognizable filename formats → Try EXIF → Try file date → Flag for manual
- Missing EXIF data → Fall back to file system date
- Invalid dates (e.g., 13-40-2024) → Flag as problematic
- Duplicate dates → Add sequence numbers
- Non-image files → Skip silently (only process JPEG/HEIC)
- Large files (>100MB) → Warn user about potential browser memory limits

### Browser Compatibility

**Required APIs**:
- File API (FileList, File, FileReader)
- Blob API (create downloadable files)
- ArrayBuffer (read binary image data)
- Drag and Drop API

**Supported Browsers**:
- Chrome/Edge: 90+ (recommended)
- Firefox: 88+
- Safari: 14+

**Not Supported**:
- Internet Explorer (any version)
- Very old mobile browsers

---

## Deployment

### Deployment Workflow

**Automatic Deployment** (main branch):
1. Develop on `dev` branch
2. Merge `dev` → `main` via pull request
3. Cloudflare Pages detects push to `main`
4. Runs build: `npm run build`
5. Deploys `dist/` folder to edge network
6. Live in 1-2 minutes

**Build Configuration** (Cloudflare Pages):
- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 18 or 20
- Environment variables: None needed (client-side only)

### Deployment Checklist

Before merging to `main`:
- [ ] All tests passing (`npm run test`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No lint errors (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] Tested in browser (Chrome, Firefox, Safari)
- [ ] Edge cases handled (problematic files, collisions, etc.)
- [ ] README and docs updated if needed

### Rollback Procedure

If deployment has issues:
1. Go to Cloudflare Pages dashboard
2. Navigate to Deployments tab
3. Find last working deployment
4. Click "Rollback to this deployment"
5. Live in ~30 seconds

Alternative: Revert commit on main branch and push (triggers auto-redeploy).

### Monitoring

**Uptime**: UptimeRobot (free tier, optional)
**Analytics**: Cloudflare Web Analytics (free, privacy-friendly)
**Performance**: Lighthouse audits in Chrome DevTools

---

## Resources & References

### Project Documentation
- [README.md](./README.md) - Setup and quick start
- [docs/image-renamer-brief.md](./docs/image-renamer-brief.md) - Project requirements and use cases
- [docs/tech-stack-decision.md](./docs/tech-stack-decision.md) - Technology choices and rationale
- [docs/deployment-decision.md](./docs/deployment-decision.md) - Deployment strategy

### External Resources
- [React Documentation](https://react.dev/) - Official React docs
- [Vite Documentation](https://vitejs.dev/) - Vite build tool
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vitest](https://vitest.dev/) - Testing framework
- [React Testing Library](https://testing-library.com/react) - Component testing
- [MDN: File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API) - Browser file handling
- [EXIF.js](https://github.com/exif-js/exif-js) - EXIF metadata extraction

### Learning Resources
- [React Hooks Tutorial](https://react.dev/learn/hooks) - Understanding hooks
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/) - Patterns and best practices
- [Testing React Apps](https://jestjs.io/docs/tutorial-react) - Testing philosophy
- [Web File API Guide](https://web.dev/patterns/files/drag-and-drop) - Drag-drop patterns

---

## Troubleshooting

### Common Issues

**Port already in use (5173)**:
```bash
# Find process using port 5173
lsof -i :5173

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- --port 3000
```

**Docker containers won't start**:
```bash
# Reset Docker environment
docker compose down -v
docker compose up -d
```

**Dependencies not installing**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors after dependency update**:
```bash
# Rebuild TypeScript
npm run type-check

# If persistent, restart VS Code TypeScript server:
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

**Tests failing with import errors**:
- Check `vite.config.ts` has correct test configuration
- Ensure `vitest` and `@vitejs/plugin-react` are installed
- Verify imports use correct paths (no `.tsx` extension needed)

**EXIF parsing not working**:
- Ensure using `piexifjs` or `exif-js` correctly
- Check JPEG/HEIC file is valid
- Some HEIC files don't have EXIF (use fallback date)

**File download not triggering**:
- Check Blob URL creation
- Verify `<a>` tag click is triggered
- Some browsers block programmatic downloads (require user interaction)

**Large files causing browser slowdown**:
- Implement file size limit (e.g., 100MB per file)
- Process files in batches (e.g., 50 at a time)
- Use Web Workers for heavy processing (advanced)

---

## Next Steps (Guided Setup)

You now have the project foundation. Complete the setup by asking Claude Code to help you build out the structure step-by-step. This approach helps you understand each layer of the application.

### 📚 Learning Philosophy

Each step below is designed to teach you about a specific part of the React + Vite stack. Take your time, review what gets created, and ask Claude Code questions about why things are structured the way they are.

**Estimated total time**: 6-8 hours spread across multiple sessions

---

### Step 1: Initialize Vite + React + TypeScript Project
⏱️ ~20 minutes | 🎯 **Learning**: Project structure, Vite configuration, TypeScript setup

**What you'll learn**: How Vite projects are organized, what each config file does (vite.config.ts, tsconfig.json), and how TypeScript integrates with React.

**Say to Claude Code**:
```
Set up the Vite + React + TypeScript project structure as specified in claude.md. Include Tailwind CSS configuration, ESLint, Prettier, and Vitest. Please explain the purpose of each major configuration file as you create them.
```

**What will be created**:
- `package.json` with dependencies (React, Vite, TypeScript, Tailwind, Vitest, etc.)
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript strict mode configuration
- `tailwind.config.js` - Tailwind CSS setup
- `postcss.config.js` - PostCSS for Tailwind
- `.eslintrc.cjs` - ESLint rules (React, TypeScript, a11y)
- `.prettierrc` - Code formatting rules
- `index.html` - Entry point
- `src/main.tsx` - React entry point
- `src/App.tsx` - Root component (placeholder)
- `src/index.css` - Global styles with Tailwind directives

**Verification**:
```bash
npm install
npm run dev
# Should see "Hello World" placeholder at http://localhost:5173

npm run type-check
# Should pass with no errors

npm run lint
# Should pass with no errors
```

**Before moving to Step 2**: Review the configuration files, read the comments, and ensure you understand the project structure. Ask Claude Code questions about anything unclear.

---

### Step 2: Set Up TypeScript Types & Interfaces
⏱️ ~15 minutes | 🎯 **Learning**: TypeScript type design, modeling application state

**What you'll learn**: How to define type-safe interfaces for file metadata, parsed results, and application state. Understanding how types prevent bugs.

**Say to Claude Code**:
```
Create TypeScript type definitions in src/types/index.ts for the image renaming application as specified in claude.md. Include types for: File metadata, parsed date results, filename generation results, collision detection, and problematic files. Please explain the reasoning behind each type.
```

**What will be created**:
- `src/types/index.ts` with:
  - `FileMetadata` interface (original file + metadata)
  - `ParsedDate` interface (date + confidence + source)
  - `RenameResult` interface (original → new filename + status)
  - `ProblematicFile` interface (file + error reason)
  - Utility types and enums (DateSource, FileStatus, etc.)

**Verification**:
```bash
npm run type-check
# Should compile successfully with new types
```

**Learning checkpoint**: Understand how these types will flow through the application (File → Parse → Generate → Result).

---

### Step 3: Implement Date Parsing Business Logic
⏱️ ~45 minutes | 🎯 **Learning**: Pure functions, RegEx patterns, TDD, EXIF metadata extraction

**What you'll learn**: How to write testable business logic separate from UI, parse filenames with regular expressions, extract EXIF data from images, and write unit tests first (TDD).

**Say to Claude Code**:
```
Implement the date parsing logic in src/lib/parsers/ as specified in claude.md. Create filenameParser.ts (RegEx patterns for MM-DD-YYYY, YYYY-MM-DD, etc.), exifParser.ts (read EXIF DateTimeOriginal), and fallbackParser.ts (use file lastModified). Write unit tests first in tests/unit/ to demonstrate TDD. Explain the parsing strategy and RegEx patterns.
```

**What will be created**:
- `src/lib/parsers/filenameParser.ts` - Extract dates from filenames
- `src/lib/parsers/exifParser.ts` - Read EXIF metadata (using piexifjs)
- `src/lib/parsers/fallbackParser.ts` - Use file system dates
- `tests/unit/filenameParser.test.ts` - Unit tests for filename parsing
- `tests/unit/exifParser.test.ts` - Unit tests for EXIF parsing
- Helper functions for date validation

**Verification**:
```bash
npm run test
# All parsing tests should pass

# Test with example filenames in tests:
# "01-15-2024.jpg" → 2024-01-15
# "2024-01-15.jpg" → 2024-01-15
# "invalid.jpg" → falls back to EXIF or file date
```

**Learning checkpoint**: Understand the parsing strategy (filename → EXIF → file date → manual) and how pure functions make testing easy.

---

### Step 4: Implement Filename Generation & Collision Detection
⏱️ ~30 minutes | 🎯 **Learning**: Pure functions, algorithm design, edge case handling

**What you'll learn**: How to generate consistent filenames, detect collisions, and handle edge cases like duplicate dates.

**Say to Claude Code**:
```
Implement filename generation in src/lib/generators/ as specified in claude.md. Create filenameGenerator.ts (YYYY-MM-DD format) and collisionDetector.ts (add sequence numbers for duplicates). Write unit tests demonstrating collision handling. Explain the collision detection algorithm.
```

**What will be created**:
- `src/lib/generators/filenameGenerator.ts` - Generate YYYY-MM-DD.ext filenames
- `src/lib/generators/collisionDetector.ts` - Detect duplicates, add -01, -02, etc.
- `tests/unit/filenameGenerator.test.ts` - Unit tests
- `tests/unit/collisionDetector.test.ts` - Collision scenarios

**Verification**:
```bash
npm run test
# All tests should pass

# Test collision scenarios:
# Two files with 2024-01-15 → 2024-01-15.jpg, 2024-01-15-01.jpg
# Three files with same date → 2024-01-15.jpg, -01, -02
```

**Learning checkpoint**: Understand how collision detection works and why sequence numbers start at 01 (not 1).

---

### Step 5: Create File Upload Components (Drag & Drop)
⏱️ ~45 minutes | 🎯 **Learning**: React components, drag-drop events, Web File API, component composition

**What you'll learn**: How to handle drag-and-drop file uploads, work with the File API, manage component state, and create accessible UI.

**Say to Claude Code**:
```
Create file upload components in src/components/FileUpload/ as specified in claude.md. Build DragDropZone.tsx (drag-drop area with visual feedback) and FileInput.tsx (traditional file picker fallback). Use Tailwind CSS for styling. Include TypeScript props and explain drag-drop event handling.
```

**What will be created**:
- `src/components/FileUpload/DragDropZone.tsx` - Drag-drop UI with hover states
- `src/components/FileUpload/FileInput.tsx` - File picker button
- Component tests in `tests/components/`
- Styled with Tailwind (hover effects, borders, animations)

**Verification**:
```bash
npm run dev
# Visit http://localhost:5173
# Should see drag-drop zone
# Drag files onto zone → visual feedback (border change, background)
# Drop files → files appear in state (verify in React DevTools)

npm run test
# Component tests should pass
```

**Learning checkpoint**: Understand how File API works (FileList → File objects) and how drag events are handled (onDragOver, onDrop).

---

### Step 6: Create Preview Table Components
⏱️ ~45 minutes | 🎯 **Learning**: React lists, table rendering, conditional rendering, component props

**What you'll learn**: How to render lists efficiently, display before/after previews, handle problematic files with different UI, and use TypeScript for props.

**Say to Claude Code**:
```
Create preview components in src/components/Preview/ as specified in claude.md. Build PreviewTable.tsx (table with before/after columns), FileRow.tsx (individual file preview), and ProblematicFileRow.tsx (flagged files with error messages). Style with Tailwind. Explain list rendering and keys.
```

**What will be created**:
- `src/components/Preview/PreviewTable.tsx` - Table container with headers
- `src/components/Preview/FileRow.tsx` - Before → After filename display
- `src/components/Preview/ProblematicFileRow.tsx` - Warning icon + reason
- Styled table (responsive, alternating row colors, hover effects)

**Verification**:
```bash
npm run dev
# Upload test files
# Should see table with:
#   Column 1: Original filename
#   Column 2: New filename (YYYY-MM-DD)
#   Column 3: Status (Success or Problematic with reason)

npm run test
# Preview component tests should pass
```

**Learning checkpoint**: Understand React keys for lists, conditional rendering (success vs problematic), and component composition.

---

### Step 7: Implement File Processing Hook (useFileProcessor)
⏱️ ~60 minutes | 🎯 **Learning**: Custom hooks, state management, side effects, async operations

**What you'll learn**: How to create custom React hooks, manage complex state, handle async file reading, and orchestrate business logic from components.

**Say to Claude Code**:
```
Create a custom hook src/hooks/useFileProcessor.ts as specified in claude.md. This hook should: accept File[] as input, parse dates (filename → EXIF → fallback), generate new filenames, detect collisions, flag problematic files, and return processed results. Use useReducer for complex state. Explain hook design patterns.
```

**What will be created**:
- `src/hooks/useFileProcessor.ts` - Main processing hook
  - State: `files`, `processedResults`, `problematicFiles`, `isProcessing`
  - Functions: `processFiles()`, `reset()`
  - Uses all parsers and generators from lib/
- `src/hooks/useFileUpload.ts` - File selection hook
  - Handles drag-drop and file input
  - Validates file types (JPEG, HEIC only)
- Integration tests for hooks

**Verification**:
```bash
npm run test
# Hook tests should pass

npm run dev
# Upload files → see processing state → see results
# Check React DevTools for hook state
```

**Learning checkpoint**: Understand how custom hooks encapsulate logic, how useReducer manages complex state, and how async operations work in hooks.

---

### Step 8: Create Download & Action Components
⏱️ ~30 minutes | 🎯 **Learning**: Blob API, programmatic downloads, user interactions

**What you'll learn**: How to create downloadable files from browser memory, trigger downloads programmatically, and handle user actions.

**Say to Claude Code**:
```
Create action components in src/components/Actions/ as specified in claude.md. Build DownloadButton.tsx (trigger download of renamed files) and CancelButton.tsx (reset state). Implement src/lib/utils/downloadFiles.ts to create Blobs and trigger downloads. Explain Blob URLs and download mechanics.
```

**What will be created**:
- `src/components/Actions/DownloadButton.tsx` - Download button with loading state
- `src/components/Actions/CancelButton.tsx` - Reset/clear button
- `src/lib/utils/downloadFiles.ts` - Blob creation and download logic
  - Create Blob from File
  - Generate Blob URL
  - Trigger download via `<a>` tag click
  - Revoke URL after download

**Verification**:
```bash
npm run dev
# Upload files → Preview → Click Download
# Should download renamed files (or zip of all files)
# Check Downloads folder for files with new names

npm run test
# Download utility tests should pass
```

**Learning checkpoint**: Understand how Blob URLs work, how to trigger downloads without server, and memory management (revoking URLs).

---

### Step 9: Build Layout Components & Assemble App
⏱️ ~30 minutes | 🎯 **Learning**: Component composition, app structure, layout patterns

**What you'll learn**: How to compose components into a full application, create reusable layout components, and structure the main App component.

**Say to Claude Code**:
```
Create layout components in src/components/Layout/ (Header.tsx, Footer.tsx) and assemble the main App.tsx as specified in claude.md. Wire up all components with the useFileProcessor hook. Add instructions, help text, and user guidance. Explain component composition and data flow.
```

**What will be created**:
- `src/components/Layout/Header.tsx` - App title and description
- `src/components/Layout/Footer.tsx` - Instructions and help
- Updated `src/App.tsx` - Main component with all pieces wired together
  - File upload → Preview table → Actions
  - State management via hooks
  - Conditional rendering (empty state, processing, results)

**Verification**:
```bash
npm run dev
# Should see complete application:
#   1. Header with title and description
#   2. Drag-drop zone
#   3. Preview table (after upload)
#   4. Download/Cancel buttons
#   5. Footer with instructions

# Test full flow:
# Upload → Preview → Download → Cancel → Repeat
```

**Learning checkpoint**: Understand how components compose together, data flows down (props) and up (callbacks), and how hooks manage state.

---

### Step 10: Add Integration Tests & Error Handling
⏱️ ~45 minutes | 🎯 **Learning**: Integration testing, error boundaries, edge cases

**What you'll learn**: How to write integration tests for full workflows, handle errors gracefully, and test edge cases.

**Say to Claude Code**:
```
Create integration tests in tests/integration/fileProcessingFlow.test.tsx that test the complete user workflow: upload files, parse dates, handle problematic files, download results. Add error boundaries and improve error handling throughout the app. Explain integration testing strategy.
```

**What will be created**:
- `tests/integration/fileProcessingFlow.test.tsx` - Full workflow tests
  - Upload valid files → success
  - Upload problematic files → flagged correctly
  - Collision detection → sequence numbers added
  - Download → files renamed correctly
- Error boundaries in components
- Improved error messages
- Loading states

**Verification**:
```bash
npm run test
# All integration tests should pass

# Test edge cases manually:
# - Invalid file types (PDFs, etc.) → rejected
# - Files with no dates → flagged
# - Duplicate dates → sequence numbers
# - Very large files → warning
```

**Learning checkpoint**: Understand integration testing (testing workflows, not individual units) and graceful error handling.

---

### Step 11: Optimize Performance & Accessibility
⏱️ ~30 minutes | 🎯 **Learning**: React performance, memoization, accessibility (a11y)

**What you'll learn**: How to optimize React performance with useMemo/useCallback, ensure accessibility with ARIA labels and keyboard navigation, and improve UX.

**Say to Claude Code**:
```
Optimize the app for performance and accessibility. Add useMemo/useCallback where appropriate, ensure all interactive elements are keyboard accessible, add ARIA labels, and improve loading states. Run a Lighthouse audit and explain optimizations.
```

**What will be created**:
- Performance optimizations:
  - useMemo for expensive computations (collision detection)
  - useCallback for stable function references
  - React.memo for component memoization (if needed)
- Accessibility improvements:
  - ARIA labels for file upload
  - Keyboard navigation (Tab, Enter, Escape)
  - Focus management
  - Screen reader announcements
- Loading states and skeleton screens

**Verification**:
```bash
npm run dev
# Test keyboard navigation (Tab through all elements, Enter to activate)
# Test with screen reader (VoiceOver on Mac)

# Run Lighthouse audit in Chrome DevTools:
# → Performance: 90+
# → Accessibility: 95+
# → Best Practices: 90+
```

**Learning checkpoint**: Understand React performance optimization and web accessibility best practices.

---

### Step 12: Documentation & Deployment Preparation
⏱️ ~30 minutes | 🎯 **Learning**: Documentation practices, deployment workflow, production builds

**What you'll learn**: How to document your code, prepare for deployment, and create production-ready builds.

**Say to Claude Code**:
```
Help me finalize documentation: update README.md with complete setup instructions, add inline code comments where helpful, and prepare for deployment. Create a deployment checklist and explain the Cloudflare Pages deployment process. Build a production bundle and verify it works.
```

**What will be created**:
- Updated `README.md` with:
  - Features overview
  - Setup instructions
  - Usage guide
  - Deployment steps
- Inline code comments for complex logic
- Deployment checklist
- Production build verification

**Verification**:
```bash
npm run build
# Should create optimized dist/ folder

npm run preview
# Test production build locally at http://localhost:4173
# Verify all features work in production mode

npm run lint && npm run type-check && npm run test
# All checks should pass (deployment ready)
```

**Learning checkpoint**: Understand production builds (minification, tree-shaking) and deployment preparation.

---

### 🎓 You're Ready to Deploy!

After completing these 12 steps, you'll have:
- ✅ Complete Vite + React + TypeScript project structure
- ✅ TypeScript types for type-safe development
- ✅ Date parsing business logic (filename → EXIF → fallback)
- ✅ Filename generation with collision detection
- ✅ Drag-and-drop file upload UI
- ✅ Preview table with before/after filenames
- ✅ File processing custom hooks
- ✅ Download functionality (Blob URLs)
- ✅ Complete application with all components wired together
- ✅ Unit, component, and integration tests
- ✅ Performance optimization and accessibility
- ✅ Documentation and deployment readiness

**Next Steps**:

1. **Deploy to Cloudflare Pages**:
   ```bash
   # Push to GitHub
   git add .
   git commit -m "feat: complete image file renamer app"
   git push origin main

   # Set up Cloudflare Pages (one-time):
   # 1. Log into Cloudflare dashboard
   # 2. Pages → Create project → Connect GitHub
   # 3. Select image-file-renamer repository
   # 4. Configure build:
   #    - Framework: Vite
   #    - Build command: npm run build
   #    - Output directory: dist
   # 5. Deploy!
   ```

2. **Test in production**: Verify all features work at your Cloudflare Pages URL

3. **Share and iterate**: Get feedback, add features, improve UX

4. **Optional enhancements** (future ideas):
   - Add batch download as ZIP file (using JSZip library)
   - Support more image formats (PNG, WebP)
   - Add dark mode toggle
   - Allow custom date formats (YYYY_MM_DD, etc.)
   - Save rename configurations for reuse
   - Add drag-and-drop reordering of files

**Remember**: Continue using conventional commits, write tests for new features, and ask Claude Code for help with anything!

---

**Last Updated**: 2025-11-14
**Project Status**: 🚧 Active Development (Guided Setup in Progress)
**Skills Workflow**: ✅ Phase 3 Complete (project-spinup)
