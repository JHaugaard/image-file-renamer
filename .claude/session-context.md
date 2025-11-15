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

**Current Status**: 🎓 **Foundation ready, ready to begin Step 1 of guided setup**

**Next Action**: Start new session and give Claude Code the first prompt (Step 1) to initialize Vite + React + TypeScript project structure.

**Main Reference**: [claude.md](../claude.md) - Contains all 12 steps with detailed instructions, learning objectives, and verification steps.
