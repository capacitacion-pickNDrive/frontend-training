import { TaskList } from '@/components/TaskList/TaskList'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Tareas</h1>
      <TaskList />
    </main>
  )
}
