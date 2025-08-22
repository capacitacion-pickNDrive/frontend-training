import { useTasks } from '@/hooks/useTasks.ts'

export function TaskList() {
  const { tasks, loading, error } = useTasks()
  console.log('tasks:', tasks)

  if (loading) return <div>Cargando tareas...</div>
  if (error) return <div>Error al cargar tareas</div>
  if (!tasks.length) return <div>No hay categorías.</div>

  return (
    <div className="grid gap-6">
      {tasks.map((categoria: any) => (
        <div key={categoria.id}>
          <h2 className="font-semibold mb-2">{categoria.nombre}</h2>
          {/* Si tienes un array de tareas, mapea aquí. Ejemplo: categoria.tareas?.map(...) */}
          {/* Si no hay tareas, muestra un mensaje */}
          <p className="text-sm text-muted">No hay tareas en esta categoría.</p>
        </div>
      ))}
    </div>
  )
}
