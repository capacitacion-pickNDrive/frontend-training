import axios from 'axios'
import type { Post } from '@/types/api'

// ==========================
// Axios Instances
// ==========================

// API general (posts)
const postsApi = axios.create({
  baseURL: 'http://localhost:1337/api', // raíz general
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// API de autenticación (login/register)
const authApi = axios.create({
  baseURL: 'http://localhost:1337/api/auth/local',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ==========================
// Posts Service
// ==========================
export const postsService = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await postsApi.get('/posts')
    return data
  },

  getPost: async (id: number): Promise<Post> => {
    const { data } = await postsApi.get(`/posts/${id}`)
    return data
  },

  deletePost: async (id: string) => {
    const { data } = await postsApi.delete(`/posts/${id}`)
    return data
  },
}

// ==========================
// Auth Service
// ==========================
export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await authApi.post('/', { identifier: email, password })
    return data
  },

  register: async (username: string, email: string, password: string) => {
    const { data } = await authApi.post('/register', { username, email, password })
    return data
  },
}

// ==========================
// Export Axios Instances (opcional)
// ==========================
export default { postsApi, authApi }
