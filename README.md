# Frontend Training

A modern React application built with TypeScript and Vite, demonstrating best practices for consuming and displaying API data.

## Goal

The main goal is to consume data from an API and display it on screen, applying best practices and organizing the code in a clean, maintainable way.

## Technologies Used

- **React 19** - A JavaScript library for building user interfaces with the latest features
- **TypeScript** - Provides type safety and better developer experience
- **Vite** - Fast build tool and development server with hot module replacement
- **Tailwind CSS v4** - Modern utility-first CSS framework for rapid UI development
- **TanStack Query** - Powerful data fetching, caching, and synchronization for React applications
- **TanStack Router** - Type-safe routing solution with excellent TypeScript integration
- **Axios** - Promise-based HTTP client for making API requests
- **ShadCN/UI** - Beautiful, accessible UI components built with Radix UI and Tailwind CSS

## Getting Started

### Installation

Install dependencies using pnpm:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build the application for production:

```bash
pnpm run build
```

### Code Quality

Run ESLint to check for code quality issues:

```bash
pnpm run lint
```

Format code with Prettier:

```bash
pnpm run format
```

Check code formatting:

```bash
pnpm run format:check
```

Run TypeScript type checking:

```bash
pnpm run type-check
```

## Git Hooks

This project uses Husky to enforce code quality through git hooks:

### Pre-commit Hook

Runs automatically before each commit:

- **Auto-formats** staged files with Prettier
- **Auto-fixes** ESLint issues where possible
- **Non-blocking** - commits proceed even if some issues remain

### Pre-push Hook

Runs automatically before each push:

- **Blocks pushes to main branch** - encourages feature branches and PRs
- **Blocks unformatted code** - ensures consistent formatting
- **Blocks ESLint errors** - allows warnings but prevents errors

### Recommended Workflow

1. Work on feature branches: `git checkout -b feature/your-feature`
2. Make commits (pre-commit will auto-format)
3. Push to feature branch: `git push origin feature/your-feature`
4. Create pull request to develop

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/          # ShadCN/UI components
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── routes/          # TanStack Router route definitions
├── services/        # API service functions
├── types/           # TypeScript type definitions
└── lib/             # Utility functions
```

## API Configuration

### Changing the API Endpoint

To change the API endpoint, modify the base URL in `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'https://your-api-endpoint.com', // Change this URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Adding New API Endpoints

1. Define the data types in `src/types/api.ts`
2. Add the API functions to `src/services/api.ts`
3. Create custom hooks in `src/hooks/` using TanStack Query
4. Use the hooks in your components

## Adding ShadCN/UI Components

To add a new ShadCN/UI component:

1. Browse available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components)
2. Install the component using the CLI:
   ```bash
   pnpm dlx shadcn@latest add [component-name]
   ```
3. Import and use the component in your React components:
   ```typescript
   import { Button } from '@/components/ui/button'
   ```

### Available Components

Currently installed ShadCN/UI components:

- `Card` - For displaying content in a structured format
- `Button` - Interactive button component with variants

## Features

- ✅ **API Integration** - Fetches data from JSONPlaceholder API
- ✅ **Loading States** - Shows loading indicators while fetching data
- ✅ **Error Handling** - Displays error messages with retry functionality
- ✅ **Responsive Design** - Mobile-friendly layout using Tailwind CSS
- ✅ **Type Safety** - Full TypeScript support throughout the application
- ✅ **Modern Routing** - Client-side routing with TanStack Router
- ✅ **Data Caching** - Intelligent caching with TanStack Query
- ✅ **Component Library** - Beautiful UI components with ShadCN/UI

## Routes

- `/` - Home page displaying posts from the API
- `/about` - Information about the project and technologies used

## Recommended VS Code Extensions

To enhance your development experience, install these VS Code extensions:

### Essential Extensions

- **ES7+ React/Redux/React-Native snippets** - JavaScript and React code snippets
- **TypeScript Importer** - Automatically imports TypeScript definitions
- **Tailwind CSS IntelliSense** - Intelligent autocomplete for Tailwind classes
- **Prettier - Code formatter** - Automatic code formatting
- **ESLint** - JavaScript linting and error detection

### Additional Helpful Extensions

- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Bracket Pair Colorizer** - Colorize matching brackets
- **GitLens** - Enhanced Git capabilities
- **Path Intellisense** - File path autocomplete

## Library Documentation

Comprehensive guides for each major library used in this project:

- **[ShadCN/UI Guide](./docs/shadcn-ui.md)** - Components, variants, and customization
- **[TanStack Router Guide](./docs/tanstack-router.md)** - Type-safe routing and navigation
- **[TanStack Query Guide](./docs/tanstack-query.md)** - Data fetching and caching
- **[Tailwind CSS Guide](./docs/tailwind-css.md)** - Utility classes and responsive design
- **[Axios Guide](./docs/axios.md)** - HTTP client and API integration

## Development Notes

- The application uses file-based routing with TanStack Router
- API calls use default TanStack Query caching behavior
- All components are built with accessibility in mind
- The project follows React and TypeScript best practices
- Code is organized in a modular, maintainable structure
