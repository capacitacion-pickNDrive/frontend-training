import { Card } from '@/components/ui/card'
import { useTasks } from '@/hooks/useTasks'

export function TaskList() {
  const { tasks, loading, error } = useTasks()

  if (loading) return <div>Cargando tareas...</div>
  if (error) return <div>Error al cargar tareas</div>

  return (
    <div className="grid gap-4">
      {tasks.map((task: any) => (
        <Card key={task.id} className="p-4">
          <h3 className="font-bold">{task.attributes?.titulo}</h3>
          <p>{task.attributes?.descripcion}</p>
        </Card>
      ))}
    </div>
  )
}
