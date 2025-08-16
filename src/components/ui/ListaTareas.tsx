import { useTareas, useEliminarTarea, useCambiarEstadoTarea } from '@/hooks/useTareas'

export default function ListaTareas() {
  const { data: tareas, isLoading, isError } = useTareas()
  const { mutate: eliminarTarea, isPending: eliminando } = useEliminarTarea()
  const { mutate: cambiarEstado, isPending: cambiandoEstado } = useCambiarEstadoTarea()

  if (isLoading) return <p className="text-gray-500">Cargando tareas...</p>
  if (isError) return <p className="text-red-500">Error al cargar tareas</p>
  if (!tareas || tareas.length === 0) return <p>No hay tareas disponibles</p>

  const handleEliminar = (tareaId: number) => {
    if (window.confirm('¿Seguro que querés eliminar esta tarea?')) {
      console.log('Eliminando tarea con ID:', tareaId)
      eliminarTarea(tareaId)
    }
  }

  const handleCambiarEstado = (tareaId: number, estadoActual: boolean | null) => {
    const nuevoEstado = !estadoActual
    console.log('Cambiando estado de tarea:', tareaId, 'de', estadoActual, 'a', nuevoEstado)
    cambiarEstado({ id: tareaId, completada: nuevoEstado })
  }

  return (
    <ul className="space-y-2">
      {tareas.map(tarea => (
        <li key={tarea.id} className="border p-3 rounded shadow">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{tarea.titulo}</h2>
            <span
              className={`text-xs px-2 py-1 rounded ${
                tarea.completada ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {tarea.completada ? 'Completada' : 'Pendiente'}
            </span>
          </div>

          <p className="text-sm text-gray-600">{tarea.descripcion}</p>

          {tarea.categoria?.nombre && (
            <p className="text-xs text-blue-600 mt-1">Categoría: {tarea.categoria.nombre}</p>
          )}

          <p className="text-xs text-gray-400">Deadline: {tarea.deadline}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleCambiarEstado(tarea.id, tarea.completada)}
              disabled={cambiandoEstado}
              className={`px-2 py-1 text-black rounded text-xs ${
                cambiandoEstado
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-yellow-100 hover:bg-yellow-200'
              }`}
            >
              {cambiandoEstado
                ? 'Cambiando...'
                : tarea.completada
                  ? 'Marcar como pendiente ❌'
                  : 'Marcar como completada ✅'}
            </button>

            <button
              onClick={() => handleEliminar(tarea.id)}
              className="text-red-600 text-xs hover:underline disabled:text-gray-400"
              disabled={eliminando}
            >
              {eliminando ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
