import { useState, useEffect } from 'react'
import type { Categoria } from '@/types/strapi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'

export function useTasks() {
  const [tasks, setTasks] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/api/categorias?populate=tareas`)
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const jsonResponse = await response.json()
        setTasks(jsonResponse.data)
      } catch (e) {
        setError(e as Error)
        console.error('Fallo al obtener las tareas:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  return { tasks, loading, error }
}
