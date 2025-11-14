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
- **Hosting**: Will be determined by hosting-advisor skill
- **Deployment**: Static site deployment
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
Deployment:   Static hosting (TBD by hosting-advisor)
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
- Static site hosting (cheapest option, ~$0-5/month)
- Works with Hostinger static hosting
- Can deploy to Netlify/Vercel if preferred
- Zero backend maintenance burden
- Scales naturally (no server load)

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
- Monthly hosting: $0-5 (static site)
- No external services required
- Development tools: VS Code, Node.js, npm (all free)

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

## Next Steps for Hosting-Advisor

When invoking hosting-advisor skill, provide:

1. **Stack Being Used**: React + Vite (static site)
2. **Deployment Type**: Static site hosting (no server-side code)
3. **User Context**: Personal project, self-hosted infrastructure available (Hostinger VPS)
4. **Infrastructure**: Existing Hostinger VPS, Cloudflare DNS available
5. **Cost Constraints**: Minimal (looking for efficient, low-cost solution)
6. **Timeline**: Learning pace, no urgent deadline

**Questions for Hosting-Advisor**:
- Should I use Hostinger static hosting or Netlify/Vercel?
- What are the trade-offs between self-hosting on VPS vs. managed static hosting?
- How does static site deployment work on Hostinger?
- What's the simplest path from local development to deployed site?

---

## Context for Project-Starter

After hosting-advisor decision, project-starter should scaffold:

1. **Project Structure**: React + Vite + TypeScript
2. **Core Components**: DragDropZone, PreviewTable, DownloadButton
3. **Business Logic**: DateParser, FilenameGenerator, CollisionDetector
4. **Dependencies**: React, Vite, Tailwind, piexifjs, testing libraries
5. **Development Workflow**: Hot reload, testing setup, build optimization
6. **Documentation**: README with how to run locally, how to use app, development guide

---

## Summary

**Chosen Path**: React + Vite for a modern, learning-focused web app that processes images entirely client-side. Aligns with all stated requirements (simple, client-side, learning the "why"), minimizes infrastructure complexity, and maximizes learning value.

**Ready For**: Hosting-advisor skill to determine deployment strategy.
