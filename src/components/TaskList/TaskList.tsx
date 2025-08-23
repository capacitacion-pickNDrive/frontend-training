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
          <div className="grid gap-4">
            {categoria.tareas && categoria.tareas.length > 0 ? (
              categoria.tareas.map((tarea: any) => (
                <div key={tarea.id} className="p-4 border rounded">
                  <h3 className="font-bold">{tarea.titulo}</h3>
                  {/* Otros campos de la tarea si existen */}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No hay tareas en esta categoría.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
