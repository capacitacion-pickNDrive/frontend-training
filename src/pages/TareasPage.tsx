import { ListaTareas } from '@/components/ui/ListaTareas'
import { Link } from '@tanstack/react-router'

export const TareasPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-mono mb-4">Todas las tareas</h1>
    <Link to="/nueva" className="text-blue-600 underline mb-4 block">
      Crear nueva tarea
    </Link>
    <ListaTareas />
  </div>
)
