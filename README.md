# Image File Renamer

> A client-side web application for batch renaming JPEG and HEIC image files to YYYY-MM-DD format

**Status**: 🚧 Active Development (Guided Setup)  
**Tech Stack**: React 18 + Vite + TypeScript  
**Developer**: John  
**Deployment**: Cloudflare Pages ($0/month)

---

## Overview

Image File Renamer helps photographers organize their image libraries by automatically renaming files to a consistent, sortable YYYY-MM-DD naming convention.

**Key Features**:
- 📤 Drag-and-drop file upload
- 🔍 Intelligent date extraction (filename → EXIF → file date)
- 👀 Preview before renaming with before/after table
- 🔢 Automatic collision detection (sequence numbers)
- 🚫 Graceful handling of problematic files
- 🔒 100% client-side processing (files never leave your browser)
- 📦 Batch download of renamed files

---

## Quick Start

### Prerequisites

- **Node.js**: v18 or v20 (LTS)
- **npm**: v9+ (comes with Node.js)
- **Git**: For version control
- **Docker Desktop**: (Optional) For containerized development

### Setup Instructions

**Note**: This project uses **Guided Setup** - you'll build it incrementally with Claude Code.

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd image-file-renamer
   ```

2. **Copy environment variables** (optional, currently empty):
   ```bash
   cp .env.example .env.local
   ```

3. **Follow the Guided Setup**:
   Open [claude.md](./claude.md) and follow the "Next Steps (Guided Setup)" section.
   
   You'll work through 12 steps to build the application incrementally:
   - Step 1: Initialize Vite + React + TypeScript project
   - Step 2: Set up TypeScript types
   - Step 3: Implement date parsing logic
   - Step 4: Implement filename generation
   - Step 5: Create file upload components
   - Step 6: Create preview table
   - Step 7: Implement file processing hooks
   - Step 8: Create download components
   - Step 9: Assemble the app
   - Step 10: Add integration tests
   - Step 11: Optimize performance & accessibility
   - Step 12: Documentation & deployment prep

   **Estimated time**: 6-8 hours spread across multiple sessions

4. **Start developing** (after completing guided setup):
   ```bash
   npm install
   npm run dev
   ```
   
   Open http://localhost:5173

---

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Type check TypeScript
npm run type-check

# Lint code
npm run lint

# Format code with Prettier
npm run format
```

### Docker (Optional)

Use Docker for a containerized development environment:

```bash
# Start development server in Docker
docker compose up -d

# View logs
docker compose logs -f

# Stop containers
docker compose down
```

---

## Tech Stack

- **Frontend**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite 5.x
- **Styling**: Tailwind CSS 3.x + shadcn/ui
- **State**: React hooks (useState, useReducer, Context API)
- **File Handling**: Web File API, Blob, ArrayBuffer, EXIF parsing
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **Deployment**: Cloudflare Pages (free tier)

---

## Project Structure

```
image-file-renamer/
├── src/
│   ├── components/       # React components
│   ├── lib/              # Business logic (parsers, generators, validators)
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── tests/                # Unit, component, and integration tests
├── docs/                 # Project documentation
├── public/               # Static assets
├── claude.md             # Comprehensive project context for Claude Code
├── README.md             # This file
└── package.json          # Dependencies and scripts
```

---

## Documentation

For comprehensive development documentation, see:

- **[claude.md](./claude.md)** - Complete project context, guided setup steps, development workflow, and troubleshooting
- **[docs/image-renamer-brief.md](./docs/image-renamer-brief.md)** - Project requirements and use cases
- **[docs/tech-stack-decision.md](./docs/tech-stack-decision.md)** - Technology choices and rationale
- **[docs/deployment-decision.md](./docs/deployment-decision.md)** - Deployment strategy and workflow

---

## Deployment

This project deploys to **Cloudflare Pages** with automatic builds from GitHub.

### Deployment Workflow

1. Develop on `dev` branch
2. Merge `dev` → `main` via pull request
3. Cloudflare automatically builds and deploys
4. Live in 1-2 minutes

### First-Time Cloudflare Pages Setup

1. Push code to GitHub
2. Log into Cloudflare dashboard
3. Navigate to Pages → Create project
4. Connect GitHub repository
5. Configure build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node.js version: 18 or 20
6. Deploy!

**Cost**: $0/month (unlimited bandwidth on free tier)

---

## Learning Goals

This project is designed for learning:

- Modern React patterns (hooks, composition, state management)
- TypeScript with strict mode
- Web Platform APIs (File API, Blob, EXIF parsing)
- Testing strategies (unit, component, integration)
- Client-side file processing
- Modern build tools (Vite)
- Static site deployment (Cloudflare Pages)

---

## Contributing

This is a personal learning project. Feel free to fork and experiment!

---

## License

MIT

---

## Support

For questions or issues, see [claude.md](./claude.md) troubleshooting section or open an issue on GitHub.

---

**Happy coding!** 🚀
