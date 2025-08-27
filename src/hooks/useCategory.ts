import { useState, useEffect } from 'react'
import type { Categoria } from '@/types/strapi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'

export function useCategories() {
  const [categories, setCategories] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/api/categorias?populate[tareas][populate]=*`)
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const jsonResponse = await response.json()
        setCategories(jsonResponse.data)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return { categories, loading, error }
}
