import { createFileRoute } from '@tanstack/react-router'
import { PostsPage } from '@/pages/PostsPage'

export const Route = createFileRoute('/')({
  component: PostsPage,
})
