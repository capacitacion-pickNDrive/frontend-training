import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export interface Categoria {
  id: number
  nombre: string
  type: string
}

export interface Tarea {
  id: number
  titulo: string
  descripcion: string
  completada: boolean | null
  deadline: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  categoria?: Categoria
}

// --- Fetch tareas ---
const fetchTareas = async (): Promise<Tarea[]> => {
  const res = await axios.get('http://localhost:1337/api/tareas?populate=categoria')
  return res.data.data
}

export const useTareas = () => {
  return useQuery<Tarea[]>({
    queryKey: ['tareas'],
    queryFn: fetchTareas,
  })
}

// --- Eliminar tarea ---
export const useEliminarTarea = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (documentId: string) => {
      await axios.delete(`http://localhost:1337/api/tareas/${documentId}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tareas'] }),
  })
}

// --- Crear tarea ---
export const useCrearTarea = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (nueva: Partial<Tarea>) => {
      await axios.post('http://localhost:1337/api/tareas', { data: nueva })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tareas'] }),
    onError: error => console.error('Mutación fallida:', error),
  })
}

// --- Cambiar estado de tarea ---
export const useCambiarEstadoTarea = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ documentId, completada }: { documentId: string; completada: boolean }) => {
      await axios.put(`http://localhost:1337/api/tareas/${documentId}`, { data: { completada } }) //funciona con put, no con post (genera una tarea nueva)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tareas'] }),
    onError: error => console.error('Error al cambiar estado de tarea:', error),
  })
}
