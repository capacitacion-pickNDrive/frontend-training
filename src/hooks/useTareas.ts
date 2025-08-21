import { useQuery } from '@tanstack/react-query'
import { apiService } from '@/services/api'
import type { TaskAttrs, StrapiListResponse, StrapiSingleResponse } from '@/types/api'

// Hook to fetch all posts with loading, error states, and caching
export const useTareas = () => {
  return useQuery({
    queryKey: ['tareas'],
    queryFn: async () => {
      const res: StrapiListResponse<TaskAttrs> = await apiService.getTareas()
      // flatten: { id, titulo, descripcion, completada }
      return res.data.map(item => ({ id: item.id, ...item.attributes }))
    },
  })
}

// Hook to fetch a single post
export const useTarea = (id: number) => {
  return useQuery({
    queryKey: ['tareas', id],
    queryFn: async () => {
      const res: StrapiSingleResponse<TaskAttrs> = await apiService.getTarea(id)
      return { id: res.data.id, ...res.data.attributes }
    },
    enabled: !!id, // Only run query if id exists
  })
}
