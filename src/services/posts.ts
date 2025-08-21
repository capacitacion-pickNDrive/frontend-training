import type { Post } from '@/types/api'
import { api } from './api'

export const getPosts = async () => {
  const response = await api.get<Post[]>('/posts')
  return response.data
}

export const getPost = async (id: number) => {
  const response = await api.get<Post>(`/posts/${id}`)
  return response.data
}
