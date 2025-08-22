import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface Categoria {
  id: number
  nombre: string
  type: string
}

const fetchCategorias = async (): Promise<Categoria[]> => {
  const res = await axios.get('http://localhost:1337/api/categorias')
  return res.data.data
}

export const useCategorias = () => {
  return useQuery<Categoria[]>({
    queryKey: ['categorias'],
    queryFn: fetchCategorias,
  })
}
