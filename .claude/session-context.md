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

**Tech Stack**: React + Vite for a modern, learning-focused web app that processes images entirely client-side. Aligns with all stated requirements (simple, client-side, learning the "why"), minimizes infrastructure complexity, and maximizes learning value.

**Deployment**: Cloudflare Pages for zero-cost, globally-distributed static site hosting with automatic builds from GitHub.

**Status**: ✅ Tech stack decided | ✅ Deployment decided | 🔄 Ready for project-starter

**Next Step**: Invoke project-starter skill to scaffold the application with React + Vite + TypeScript structure, components, business logic, and deployment configuration.
