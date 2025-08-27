import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen' // generado automáticamente

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})
