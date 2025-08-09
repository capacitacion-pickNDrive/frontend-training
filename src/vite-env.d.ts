/// <reference types="vite/client" />

// Register the router instance for type safety
import type { router } from './router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
