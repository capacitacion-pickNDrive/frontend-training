import { useTasks } from '@/hooks/useTasks.ts'
import { useState, useEffect } from 'react'
import type { Categoria, Tarea } from '@/types/strapi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'

export function TaskList() {
  const { tasks, loading, error } = useTasks()
  const [localTasks, setLocalTasks] = useState<Categoria[]>([])
  const [isSyncing, setIsSyncing] = useState(false)

  // Recarga tareas desde la API
  const fetchTasks = async () => {
    setIsSyncing(true)
    try {
      const response = await fetch(`${API_URL}/api/categorias?populate=tareas`)
      const jsonResponse = await response.json()
      setLocalTasks(jsonResponse.data)
    } catch {
      // Manejo de error opcional
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  const getTareas = (categoria: Categoria): Tarea[] => {
    return Array.isArray(categoria.tareas) ? categoria.tareas : []
  }

  const handleToggle = async (categoriaDocumentId: string, tareaDocumentId: string) => {
    setLocalTasks(prev =>
      prev.map(cat =>
        cat.documentId === categoriaDocumentId
          ? {
              ...cat,
              tareas: getTareas(cat).map((tarea: Tarea) =>
                tarea.documentId === tareaDocumentId
                  ? { ...tarea, completada: !tarea.completada }
                  : tarea
              ),
            }
          : cat
      )
    )

    const categoria = localTasks.find(cat => cat.documentId === categoriaDocumentId)
    const tarea = categoria
      ? getTareas(categoria).find(t => t.documentId === tareaDocumentId)
      : null
    if (tarea) {
      await fetch(`${API_URL}/api/tareas/${tarea.documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { completada: !tarea.completada },
        }),
      })
      await fetchTasks()
    }
  }

  const handleDelete = async (categoriaDocumentId: string, tareaDocumentId: string) => {
    setLocalTasks(prev =>
      prev.map(cat =>
        cat.documentId === categoriaDocumentId
          ? {
              ...cat,
              tareas: getTareas(cat).filter((tarea: Tarea) => tarea.documentId !== tareaDocumentId),
            }
          : cat
      )
    )

    await fetch(`${API_URL}/api/tareas/${tareaDocumentId}`, { method: 'DELETE' })
    await fetchTasks()
  }

  if (loading || isSyncing) return <div>Cargando tareas...</div>
  if (error) return <div>Error al cargar tareas</div>
  if (!localTasks.length) return <div>No hay categorías.</div>

  return (
    <div className="grid gap-6">
      {localTasks.map(categoria => (
        <div key={categoria.documentId}>
          <h2 className="font-semibold mb-2">{categoria.nombre}</h2>
          <div className="grid gap-4">
            {getTareas(categoria).length > 0 ? (
              getTareas(categoria).map((tarea: Tarea) => (
                <div key={tarea.documentId} className="p-4 border rounded flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={!!tarea.completada}
                    onChange={() => handleToggle(categoria.documentId, tarea.documentId)}
                  />
                  <h3 className={`font-bold ${tarea.completada ? 'line-through' : ''}`}>
                    {tarea.titulo}
                  </h3>
                  <button
                    className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(categoria.documentId, tarea.documentId)}
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
      ))}
    </div>
  )
}
