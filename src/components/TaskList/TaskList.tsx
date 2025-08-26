import { useTasks } from '@/hooks/useTasks.ts'
import { useState, useEffect } from 'react'
import type { Categoria, Tarea } from '@/types/strapi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'

// Mapea datos planos a la estructura esperada por Categoria
function mapToCategoria(data: any[]): Categoria[] {
  return data.map(item => ({
    id: item.id,
    attributes: {
      nombre: item.nombre,
      tareas: {
        data: item.tareas
          ? item.tareas.map((t: any) => ({
              id: t.id,
              attributes: {
                titulo: t.titulo,
                completada: t.completada, // <- Cambiado
              },
            }))
          : [],
      },
      // agrega otros campos si existen
    },
  }))
}

export function TaskList() {
  const { tasks, loading, error } = useTasks()
  const [localTasks, setLocalTasks] = useState<Categoria[]>([])
  const [isSyncing, setIsSyncing] = useState(false)

  // Función para recargar tareas desde la API
  const fetchTasks = async () => {
    setIsSyncing(true)
    try {
      const response = await fetch(`${API_URL}/api/categorias?populate=tareas`)
      const jsonResponse = await response.json()
      setLocalTasks(jsonResponse.data)
    } catch {
      // Puedes manejar el error si lo deseas
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    if (tasks.length && tasks[0].attributes) {
      setLocalTasks(tasks)
    } else {
      setLocalTasks(mapToCategoria(tasks))
    }
  }, [tasks])

  const getTareas = (categoria: Categoria): Tarea[] => {
    return categoria.attributes?.tareas?.data ?? []
  }

  const handleToggle = async (categoriaId: number, tareaId: number) => {
    setLocalTasks(prev =>
      prev.map(cat =>
        cat.id === categoriaId && cat.attributes
          ? {
              ...cat,
              attributes: {
                ...cat.attributes,
                tareas: {
                  ...cat.attributes.tareas,
                  data: getTareas(cat).map((tarea: Tarea) =>
                    tarea.id === tareaId
                      ? {
                          ...tarea,
                          attributes: {
                            ...tarea.attributes,
                            completada: !tarea.attributes.completada, // <- Cambiado
                          },
                        }
                      : tarea
                  ),
                },
              },
            }
          : cat
      )
    )

    const categoria = localTasks.find(cat => cat.id === categoriaId)
    const tarea = categoria ? getTareas(categoria).find(t => t.id === tareaId) : null
    if (tarea) {
      await fetch(`${API_URL}/api/tareas/${tareaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { completada: !tarea.attributes.completada }, // <- Cambiado
        }),
      })
      await fetchTasks()
    }
  }

  const handleDelete = async (categoriaId: number, tareaId: number) => {
    setLocalTasks(prev =>
      prev.map(cat =>
        cat.id === categoriaId && cat.attributes
          ? {
              ...cat,
              attributes: {
                ...cat.attributes,
                tareas: {
                  ...cat.attributes.tareas,
                  data: getTareas(cat).filter((tarea: Tarea) => tarea.id !== tareaId),
                },
              },
            }
          : cat
      )
    )

    await fetch(`${API_URL}/api/tareas/${tareaId}`, { method: 'DELETE' })
    await fetchTasks()
  }

  if (loading || isSyncing) return <div>Cargando tareas...</div>
  if (error) return <div>Error al cargar tareas</div>
  if (!localTasks.length) return <div>No hay categorías.</div>

  return (
    <div className="grid gap-6">
      {localTasks.map(categoria =>
        categoria.attributes ? (
          <div key={categoria.id}>
            <h2 className="font-semibold mb-2">{categoria.attributes.nombre}</h2>
            <div className="grid gap-4">
              {getTareas(categoria).length > 0 ? (
                getTareas(categoria).map((tarea: Tarea) => (
                  <div key={tarea.id} className="p-4 border rounded flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={!!tarea.attributes.completada} // <- Cambiado
                      onChange={() => handleToggle(categoria.id, tarea.id)}
                    />
                    <h3
                      className={`font-bold ${tarea.attributes.completada ? 'line-through' : ''}`}
                    >
                      {' '}
                      {/* <- Cambiado */}
                      {tarea.attributes.titulo}
                    </h3>
                    <button
                      className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(categoria.id, tarea.id)}
                    >
                      Borrar
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">No hay tareas en esta categoría.</p>
              )}
            </div>
          </div>
        ) : null
      )}
    </div>
  )
}
