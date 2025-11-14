# Image File Renamer - Tech Stack Decision

**Project**: Image File Renamer
**Decision Date**: 2025-11-14
**Decided By**: Tech Stack Advisor Skill
**Status**: Approved

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 PRIMARY RECOMMENDATION: React + Vite (Client-Side Processing)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A modern, client-side web application using React 18 with Vite build tooling, processing all image operations entirely in the browser without requiring a backend server. This approach maximizes privacy, minimizes infrastructure complexity, and provides an excellent learning foundation for modern frontend development.

WHY THIS FITS YOUR PROJECT:
• **Client-side processing eliminates backend needs** - Files never leave user's computer, processing happens instantly in browser
• **Drag-drop UX natively supported** - Web File API provides native support for file handling and metadata extraction
• **Perfect for the use case** - Batch renaming 300+ images with preview-confirm workflow fits perfectly in browser environment
• **Fast MVP timeline** - Can achieve functional prototype in 2-3 weeks with focus on learning
• **Privacy by design** - No server upload means user data stays local, perfect for personal photo management

WHY THIS FITS YOUR LEARNING GOALS:
• **Modern React patterns** - Hooks, component composition, state management, and Context API
• **Web Platform APIs** - Deep dive into File API, Blob handling, ArrayBuffer, and EXIF extraction
• **TypeScript in practice** - Type-safe development with real-world application
• **Component architecture** - Understanding separation of concerns (UI vs business logic)
• **Client vs Server decisions** - Learn when to process client-side vs server-side

WHY THIS FITS YOUR INFRASTRUCTURE:
• **Static site deployment** - No backend means hosting as simple HTML/CSS/JS files
• **Minimal cost** - Can deploy to Hostinger static hosting, Netlify, or Vercel free tier
• **Zero maintenance burden** - No database, no server processes, no background jobs
• **Leverages existing workflow** - Git, Docker (optional for dev), familiar development patterns
• **Scales naturally** - Client-side processing means no server load regardless of users

TECH STACK BREAKDOWN:
─────────────────────────────────────────────────────────
Frontend:     React 18 + TypeScript
Build Tool:   Vite 5.x (fast HMR, optimized builds)
Styling:      Tailwind CSS 3.x + shadcn/ui components
State Mgmt:   React hooks (useState, useCallback) + Context API
File Parsing: piexifjs (EXIF extraction) or exif-js
File Handling: Web File API, Blob, ArrayBuffer
Testing:      Vitest + React Testing Library
Linting:      ESLint + Prettier
Deployment:   Static hosting (TBD by deployment-advisor)
Dev Tools:    VS Code, React DevTools, Vite HMR
─────────────────────────────────────────────────────────

LEARNING CURVE: 🟡 Medium
Estimate: 3-4 weeks to proficiency with React + TypeScript fundamentals
- Week 1: React basics, component patterns, hooks
- Week 2: TypeScript integration, File API, EXIF reading
- Week 3: State management, error handling, testing
- Week 4: Polish, edge cases, deployment

DEVELOPMENT SPEED: 🟢 Fast
First MVP: 2-3 weeks
- Week 1: Core file upload, parsing, preview table
- Week 2: Renaming logic, collision detection, download
- Week 3: Error handling, edge cases, UI polish

MONTHLY COST: $0-5
Breakdown:
• Hosting: $0-5 (static site on Netlify/Vercel free tier or Hostinger)
• Domain: $0 (can use subdomain or existing domain)
• External Services: $0 (no APIs, no database, no auth)
• Total: $0-5/month

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 ALTERNATIVE 1: Astro + Minimal JavaScript
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Astro with islands architecture - ship minimal JavaScript, progressive enhancement for file handling.

WHY CONSIDER THIS:
+ **Smaller bundle size** - Astro ships zero JS by default, only interactive islands get hydrated
+ **Simpler learning curve** - Less framework concepts, closer to vanilla JS
+ **Performance focused** - Faster initial page load, great Core Web Vitals
+ **Flexibility** - Can use React components only where needed (islands)

TRADE-OFFS VS PRIMARY:
- **Less transferable skills** - Astro is more niche than React in job market
- **Manual state management** - No robust state management, need to build patterns yourself
- **Smaller ecosystem** - Fewer UI component libraries, more DIY solutions
- **Client-side complexity** - File processing still needs JavaScript, but harder to structure cleanly

BEST FOR: Projects prioritizing page load speed and SEO over rich interactivity

WHEN TO CHOOSE THIS INSTEAD:
• You want absolute minimal JavaScript footprint
• Performance/bundle size is top priority over learning React
• Prefer writing more vanilla JavaScript than framework patterns
• Content-heavy site where file processing is secondary feature

Tech Stack Details:
```
Frontend:     Astro 4.x + TypeScript
Islands:      React components for file handling only
Styling:      Tailwind CSS
File Handling: Vanilla JS with Web File API
State:        Manual (vanilla JS state management)
Build:        Astro build (optimized static output)
```

Cost: $0-5/month (same static hosting)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 ALTERNATIVE 2: Next.js Full-Stack (Future-Proof)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next.js with API routes for potential server-side features (even though not needed for v1).

WHY CONSIDER THIS:
+ **Future backend flexibility** - If you later want server-side processing, batch jobs, or persistence
+ **Full-stack in one codebase** - Frontend and backend (API routes) in unified structure
+ **Production-grade patterns** - Next.js is industry standard for React applications
+ **Image optimization built-in** - Next.js Image component for future enhancements

TRADE-OFFS VS PRIMARY:
- **Unnecessary complexity for v1** - Backend capabilities not needed when processing is client-side
- **Higher hosting costs** - Need Node.js server or Vercel, can't just use static hosting
- **Slower development** - More concepts to learn (routing, API routes, SSR vs CSR)
- **Overkill for requirements** - All current features work perfectly client-side

BEST FOR: Projects that will definitely need backend features (user accounts, databases, scheduled jobs)

WHEN TO CHOOSE THIS INSTEAD:
• You're certain you'll add user accounts and save history
• Want to learn Next.js specifically for career goals
• Planning features like: email notifications, scheduled processing, usage analytics
• Willing to pay for Vercel or manage Node.js hosting

Tech Stack Details:
```
Frontend:     Next.js 14+ (App Router) + TypeScript + React 18
Backend:      Next.js API Routes (for future features)
Styling:      Tailwind CSS + shadcn/ui
Database:     Optional - could add Supabase later
File Handling: Client-side (same as primary)
Deployment:   Vercel or VPS with Node.js
```

Cost: $0-20/month (Vercel free tier → $20 Pro, or VPS Node.js hosting)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 ALTERNATIVE 3: Electron Desktop App
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build as a native desktop application using Electron (or Tauri for Rust-based alternative).

WHY CONSIDER THIS:
+ **Native desktop experience** - Feels like a real application, not a website
+ **Full file system access** - Can rename files directly without download step
+ **No hosting needed** - Distribute as downloadable app, users run locally
+ **Offline by default** - No internet required, perfect for local file operations

TRADE-OFFS VS PRIMARY:
- **Much steeper learning curve** - Need to learn Electron APIs, native packaging, code signing
- **Distribution complexity** - Need to build for multiple platforms (Mac, Windows, Linux)
- **Larger download size** - Electron bundles Chromium (~100-200MB app)
- **Harder to update** - Auto-update mechanisms complex vs "just reload website"
- **Over-engineered** - Web app works fine, desktop app doesn't add value

BEST FOR: Tools that need deep OS integration or will be used offline frequently

WHEN TO CHOOSE THIS INSTEAD:
• You specifically want to learn desktop app development
• Need true file system integration (rename in place without download)
• Users prefer desktop apps over web apps
• Offline usage is critical requirement

Tech Stack Details:
```
Framework:    Electron 28+ (or Tauri for smaller bundle)
Frontend:     React + TypeScript (same as primary)
File Handling: Node.js fs module (direct file system access)
Packaging:    electron-builder or @electron/forge
Distribution: GitHub Releases, DMG for Mac, installer for Windows
```

Cost: $0/month (no hosting, users download and run locally)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ NOT RECOMMENDED: Vue.js + Laravel Full-Stack
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vue.js frontend with Laravel PHP backend for server-side processing.

WHY RULED OUT:
• **Backend is unnecessary** - All processing can happen client-side; adding Laravel backend adds zero value
• **Massive complexity increase** - Need to learn Vue, Laravel, PHP, server deployment, database (none needed)
• **Higher hosting costs** - Requires VPS or PHP hosting with database, when static site works fine
• **Slower development** - Learning two frameworks (Vue + Laravel) vs one (React)
• **Wrong architecture** - Server-side file upload/processing is privacy risk and slower than client-side

WHEN TO RECONSIDER:
• If requirements change to include user accounts and persistent file history
• If you need server-side batch processing (e.g., process 10,000 files automatically)
• If you specifically want to learn Laravel for other projects
• If you're building a SaaS tool where users pay for processing service

Note: Even if those requirements appeared, Next.js + Supabase would be better choice than Vue + Laravel for this project.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ NOT RECOMMENDED: CLI Tool (Node.js or Python)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Command-line tool built with Node.js (Commander.js) or Python (Click/Typer).

WHY RULED OUT:
• **Project brief shifted to web app** - Original brief mentioned CLI, but session-context.md shows pivot to web UI
• **Less accessible** - Requires users to install Node.js/Python, run terminal commands
• **Harder to share** - Can't just send a URL; users need to clone repo, install dependencies
• **Less learning value** - Doesn't teach modern frontend skills (React, component architecture, etc.)
• **Limited UI/UX** - Terminal progress bars vs rich preview table with visual feedback

WHEN TO RECONSIDER:
• If you want a tool for personal use only (don't need to share)
• If target users are developers comfortable with CLI
• If you specifically want to learn CLI tool development
• If you prefer command-line workflows over web interfaces

Tech Stack Details (if you chose this):
```
Language:     Node.js + TypeScript (or Python 3.11+)
CLI Framework: Commander.js (Node) or Typer (Python)
File Handling: fs/fs-extra (Node) or pathlib (Python)
EXIF Reading:  exif-parser (Node) or Pillow (Python)
Testing:      Jest (Node) or pytest (Python)
Distribution: npm global install or pip install
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 LEARNING OPPORTUNITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With the PRIMARY recommendation (React + Vite), you'll learn:

FRONTEND SKILLS:
• **React fundamentals** - Components, props, state, lifecycle, hooks
• **Modern React patterns** - useState, useEffect, useCallback, useMemo, custom hooks
• **Component composition** - Breaking UI into reusable components (DragDropZone, PreviewTable, etc.)
• **TypeScript with React** - Typing props, state, events, and custom hooks
• **Styling approaches** - Tailwind utility classes, component libraries (shadcn/ui)
• **Form handling** - File inputs, drag-drop events, validation, error states

WEB PLATFORM SKILLS:
• **File API deep dive** - FileList, File objects, FileReader, Blob, ArrayBuffer
• **Binary data handling** - Reading image files as binary, parsing EXIF metadata
• **EXIF metadata extraction** - Using piexifjs to read creation dates from JPEG/HEIC
• **Drag-drop implementation** - Native browser drag-drop events, file handling
• **Client-side file generation** - Creating downloadable Blobs, triggering browser downloads
• **Browser capabilities** - Understanding what can/cannot be done client-side

STATE MANAGEMENT:
• **Local component state** - Managing file upload state, preview data, UI state
• **Shared state patterns** - Using Context API for app-wide state (if needed)
• **Derived state** - Computing renamed filenames from original files + parsing logic
• **State updates** - Immutable updates, batch updates, performance considerations

ARCHITECTURE CONCEPTS:
• **Separation of concerns** - UI components vs business logic (parsing, validation, collision detection)
• **Pure functions** - Date parsing, filename generation as testable pure functions
• **Error handling** - Graceful degradation, user-friendly error messages
• **Client vs Server** - Understanding when to process client-side vs server-side
• **Progressive enhancement** - How to build features that work if JS fails

TESTING:
• **Unit testing** - Testing pure functions (date parser, collision detector)
• **Component testing** - Testing React components with React Testing Library
• **Integration testing** - Testing full workflows (upload → preview → download)
• **Test-driven patterns** - Writing tests for edge cases (invalid dates, collisions, etc.)

TOOLING & WORKFLOW:
• **Vite build tool** - Fast HMR, optimized production builds, plugin system
• **TypeScript configuration** - tsconfig.json, type checking, strict mode
• **ESLint + Prettier** - Code quality, consistent formatting
• **Git workflow** - Feature branches, conventional commits, pull requests

TRANSFERABLE SKILLS:
• **React expertise** - Directly applicable to job market (React is most in-demand framework)
• **TypeScript proficiency** - Industry standard for large JavaScript codebases
• **Component thinking** - Applies to Vue, Svelte, and other component-based frameworks
• **Web APIs mastery** - File handling, Blob, ArrayBuffer knowledge useful across projects
• **Static site deployment** - Understanding modern JAMstack deployment patterns

SKILLS PROGRESSION PATH:
1. **Week 1-2**: React basics, component structure, TypeScript setup
2. **Week 3**: File API, EXIF reading, business logic implementation
3. **Week 4**: State management patterns, error handling, testing
4. **Week 5+**: Deployment, optimization, real-world usage and iteration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 COST ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIMARY RECOMMENDATION COSTS:

Initial Setup (One-time):
• Domain: $0 (can use subdomain of existing domain, or new domain ~$12/year)
• SSL Certificate: $0 (included with Netlify/Vercel/Cloudflare)
• Development tools: $0 (Node.js, VS Code, Git all free)
• Design assets: $0 (Tailwind + shadcn/ui are open source)
Total Setup: $0-12 one-time (~$0-1/month amortized)

Monthly Ongoing:
• Hosting: $0-5/month
  └─ Netlify Free Tier: $0 (100GB bandwidth, sufficient for static site)
  └─ Vercel Free Tier: $0 (100GB bandwidth, unlimited sites)
  └─ Hostinger Static Hosting: ~$3-5/month (if using existing Hostinger)
  └─ Cloudflare Pages: $0 (unlimited bandwidth on free tier!)
• Database: $0/month (no database needed)
• Backend Services: $0/month (no backend, all client-side)
• CDN: $0/month (included with hosting platforms)
• Monitoring: $0/month (can use free tier of UptimeRobot if desired)
• File Storage: $0/month (no server-side storage)

Total Monthly: $0-5/month

COST SCALING (As traffic grows):
• Current (10-100 users/month): $0/month (free tier)
• 1,000 users/month: $0/month (still within free tier limits)
• 10,000 users/month: $0/month (Cloudflare Pages scales free)
• 100,000 users/month: $0-20/month (might need paid tier on Netlify/Vercel)

Note: Since all processing is client-side, hosting costs don't scale with usage—every user's browser does the work!

COMPARE TO ALTERNATIVES:

React + Vite (PRIMARY): $0-5/month
• Static hosting, no backend, free tier sufficient

Astro + Islands: $0-5/month
• Same hosting model, same costs

Next.js on Vercel: $0-20/month
• Free tier available, but features push toward $20 Pro tier faster
• Need serverless functions (not truly static), uses more bandwidth

Next.js on VPS: $40-60/month
• Need Node.js hosting (use existing Hostinger VPS)
• Included in current VPS cost but requires maintenance

Vue + Laravel: $40-100/month
• VPS required ($40-60/month Hostinger)
• Potential database hosting ($0-25/month if separate)
• Higher complexity = higher maintenance time cost

Electron Desktop App: $0/month
• No hosting costs (users download and run locally)
• But higher development and distribution complexity

CLI Tool: $0/month
• No hosting (users install via npm/pip)
• But limited audience and no web UI

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️ ARCHITECTURAL DECISIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KEY DECISIONS MADE:

1. **Client-Side Processing** ✅
   - Decision: All file operations happen in browser (no server upload)
   - Rationale: Privacy, speed, simplicity, cost, matches use case perfectly
   - Trade-off: Can't process files larger than browser memory (~1-2GB typically)
   - Impact: No backend needed, static site deployment, instant processing

2. **React Over Vue/Svelte** ✅
   - Decision: Use React 18 as frontend framework
   - Rationale: Largest ecosystem, best job market, most learning resources
   - Trade-off: Slightly more complex than Vue, more verbose than Svelte
   - Impact: Learn most in-demand frontend framework, broad applicability

3. **Vite Over Create React App** ✅
   - Decision: Use Vite as build tool instead of CRA or webpack
   - Rationale: Faster dev experience (HMR), modern, smaller bundles, future-proof
   - Trade-off: Newer tool (less Stack Overflow answers), some plugins less mature
   - Impact: Better developer experience, learn modern tooling

4. **TypeScript Required** ✅
   - Decision: Use TypeScript from day one, not plain JavaScript
   - Rationale: Industry standard, catches bugs early, better autocomplete
   - Trade-off: Steeper learning curve, more verbose code
   - Impact: More robust code, learn professional patterns

5. **Tailwind + shadcn/ui** ✅
   - Decision: Utility-first CSS with pre-built component library
   - Rationale: Fast development, consistent design, accessible components
   - Trade-off: HTML can look cluttered with many classes
   - Impact: Quick UI development, focus on functionality over styling

6. **No Backend (For Now)** ✅
   - Decision: Skip user accounts, database, and persistence in v1
   - Rationale: Not needed for core use case, adds complexity
   - Trade-off: Can't save history, share rename configs, or have user profiles
   - Impact: Simpler architecture, but limited to one-time processing

7. **Web File API (Not FormData/Upload)** ✅
   - Decision: Use File API directly, not traditional form upload
   - Rationale: Client-side processing, no server needed
   - Trade-off: Browser compatibility (modern browsers only)
   - Impact: Privacy, speed, but requires modern browser (Chrome, Firefox, Safari latest)

WHAT GETS BUILT (Component Structure):

```
src/
├── components/
│   ├── FileUpload/
│   │   ├── DragDropZone.tsx       # Drag-drop file input
│   │   └── FileInput.tsx          # Traditional file picker fallback
│   ├── Preview/
│   │   ├── PreviewTable.tsx       # Before/after filename table
│   │   ├── FileRow.tsx            # Individual file preview row
│   │   └── ProblematicFileRow.tsx # Flagged files with errors
│   ├── Actions/
│   │   ├── DownloadButton.tsx     # Trigger rename and download
│   │   └── CancelButton.tsx       # Clear and start over
│   └── Layout/
│       ├── Header.tsx             # App title and description
│       └── Footer.tsx             # Instructions/help
├── lib/
│   ├── parsers/
│   │   ├── filenameParser.ts      # Extract date from filename
│   │   ├── exifParser.ts          # Extract date from EXIF metadata
│   │   └── fallbackParser.ts      # Use file system dates
│   ├── generators/
│   │   ├── filenameGenerator.ts   # Create YYYY-MM-DD format
│   │   └── collisionDetector.ts   # Handle duplicate dates
│   ├── validators/
│   │   ├── fileTypeValidator.ts   # Check JPEG/HEIC
│   │   └── dateValidator.ts       # Validate parsed dates
│   └── utils/
│       ├── downloadFiles.ts       # Create and trigger downloads
│       └── fileHelpers.ts         # Common file operations
├── hooks/
│   ├── useFileProcessor.ts        # Main file processing logic
│   └── useFileUpload.ts           # Handle file upload state
├── types/
│   └── index.ts                   # TypeScript type definitions
└── App.tsx                        # Main app component
```

WHAT DOES NOT GET BUILT (v1 Exclusions):

❌ User authentication (no accounts)
❌ Database persistence (no saved history)
❌ Backend API (all client-side)
❌ Recursive folder processing (flat list only)
❌ Video file support (JPEG/HEIC only)
❌ RAW format support (JPEG/HEIC only)
❌ Custom naming patterns (YYYY-MM-DD only)
❌ Batch editing metadata (rename only)
❌ Integration with photo software (standalone tool)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 RECOMMENDED NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ✅ **Tech stack decided** - React + Vite with client-side processing

2. **Next: Determine deployment strategy**
   → Invoke deployment-advisor skill with this tech stack decision

   Provide deployment-advisor with:
   - Tech stack: React + Vite (static site)
   - Deployment type: Static site hosting (no server-side code)
   - Expected traffic: Personal use initially (<100 users)
   - Budget: Minimal ($0-5/month)
   - Learning goal: Understand static site deployment

3. **After deployment decision: Initialize project**
   → Invoke project-starter skill

   Project-starter will scaffold:
   - React + Vite + TypeScript project structure
   - Component templates (DragDropZone, PreviewTable, etc.)
   - Business logic stubs (parsers, generators, validators)
   - Testing setup (Vitest + React Testing Library)
   - Development workflow (ESLint, Prettier, Git hooks)
   - Documentation (README, development guide)

4. **Questions before proceeding?**
   - Unsure about React vs alternatives? Ask me to compare in detail
   - Want to explore Electron desktop app option? I can explain trade-offs
   - Curious about Next.js future-proofing? I can explain when to migrate
   - Any technical concerns about client-side processing? Happy to discuss

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DECISION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**APPROVED STACK**: React + Vite (Client-Side Processing)

**CORE REASONING**:
- ✅ Perfect fit for use case (batch file renaming)
- ✅ Excellent learning value (React, TypeScript, Web APIs)
- ✅ Minimal cost ($0-5/month static hosting)
- ✅ Fast development timeline (2-3 weeks to MVP)
- ✅ Privacy by design (files never leave browser)
- ✅ Leverages modern web platform capabilities

**READY FOR**: Deployment-advisor skill to determine hosting strategy

**CONFIDENCE LEVEL**: 🟢 High
This stack is well-suited for requirements, learning goals, infrastructure, and budget constraints.

---

**Document Version**: 1.0
**Created**: 2025-11-14
**Next Action**: Feed this document to deployment-advisor skill
