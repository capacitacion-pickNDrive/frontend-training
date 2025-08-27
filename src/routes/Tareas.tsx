import { createFileRoute } from '@tanstack/react-router'
import { TareasPage } from '@/pages/TareasPage'

export const Route = createFileRoute('/Tareas')({
  component: TareasPage,
})
