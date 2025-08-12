# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager
This project uses **pnpm** for package management.

### Core Development Commands
```bash
pnpm dev              # Start development server (Vite)
pnpm build            # Build for production (TypeScript + Vite)
pnpm lint             # Run ESLint with auto-fix
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without fixing
pnpm type-check       # Run TypeScript type checking
pnpm preview          # Preview production build locally
```

### TanStack Router Commands
```bash
pnpm tsr generate     # Generate route tree (required after adding/modifying routes)
```

## Architecture Overview

### Technology Stack
- **React 19** with TypeScript and Vite
- **TanStack Router** for file-based routing with type safety
- **TanStack Query** for server state management and caching  
- **Axios** for HTTP requests
- **ShadCN/UI** components with Tailwind CSS v4
- **Husky** git hooks for code quality enforcement

### Application Structure

#### Routing Architecture
- **File-based routing** using TanStack Router
- Routes defined in `src/routes/` directory
- Root layout in `src/routes/__root.tsx` contains navigation and `<Outlet />`
- Route tree auto-generated in `src/routeTree.gen.ts` (never edit manually)
- Router instance created in `src/router.ts`

#### Data Flow Architecture
1. **API Layer**: `src/services/api.ts` - Axios instance and service methods
2. **Custom Hooks**: `src/hooks/` - TanStack Query hooks wrapping API calls
3. **Pages**: `src/pages/` - Page components consumed by routes
4. **Types**: `src/types/api.ts` - TypeScript interfaces for API data

#### Component Architecture
- **ShadCN/UI Components**: `src/components/ui/` - Copy-paste components, not installed via npm
- **Custom Components**: Can be added to `src/components/` for reusable logic
- **Utils**: `src/lib/utils.ts` - Contains `cn()` utility for className merging

### Key Patterns

#### Adding New Routes
1. Create route file in `src/routes/` (e.g., `src/routes/new-route.tsx`)
2. Create page component in `src/pages/`
3. Run `pnpm tsr generate` to update route tree
4. Add navigation link to `src/routes/__root.tsx` if needed

#### API Integration Pattern
1. Add API function to `src/services/api.ts`
2. Create custom hook in `src/hooks/` using TanStack Query
3. Use hook in page component
4. Handle loading, error, and success states in UI

#### ShadCN/UI Component Usage
- Components support `className` prop for custom styling
- Use `cn()` utility from `src/lib/utils.ts` for className merging
- Components support variants via CVA (Class Variance Authority)
- Add new components via: `pnpm dlx shadcn@latest add [component-name]`

## Git Workflow

### Branch Protection
- **Pre-push hook blocks direct pushes to main and develop branches**
- Use feature branches: `git checkout -b feature/your-feature-name`
- Bypass with `git push --no-verify` only when necessary

### Code Quality Hooks
- **Pre-commit**: Auto-formats and fixes staged files (non-blocking)
- **Pre-push**: Blocks unformatted code and ESLint errors
- Uses lint-staged for performance (processes only staged files)

### Path Aliases
- `@/` maps to `src/` directory (configured in vite.config.ts and tsconfig)
- Use for imports: `import { Button } from '@/components/ui/button'`

## Important Configuration Files

### API Configuration
- Base URL in `src/services/api.ts`: Currently JSONPlaceholder API
- Change API endpoint by modifying baseURL in api.ts

### Styling Configuration  
- Tailwind CSS v4 configured via `@tailwindcss/vite` plugin
- ShadCN/UI theme variables in `src/index.css`
- Component configuration in `components.json`

### Type Safety
- Router types auto-registered in `src/vite-env.d.ts`
- API types defined in `src/types/api.ts`
- Path aliases configured for TypeScript in tsconfig files