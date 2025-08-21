import axios from 'axios'
import type { Post, Task } from '@/types/api'

// Base API configuration
const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API endpoints
export const apiService = {
  // Fetch all posts from the API
  // To change the API endpoint, modify the URL below
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts')
    return response.data
  },

  // Fetch a single post by ID
  getPost: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`)
    return response.data
  },

  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks')
    return response.data.data
  }
}

// Export the axios instance for custom requests if needed
export { api }
