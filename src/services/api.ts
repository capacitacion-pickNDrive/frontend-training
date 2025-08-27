// ===========================
// services/api.ts - VERSIÓN CORREGIDA
// ===========================
import axios from 'axios'
import type { Post } from '@/types/api'

// ==========================
// Axios Instances
// ==========================

// API general
const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Add interceptors for debugging
api.interceptors.request.use(config => {
  console.log('🌐 API Request:', {
    method: config.method?.toUpperCase(),
    url: `${config.baseURL}${config.url}`,
    data: config.data,
  })
  return config
})

api.interceptors.response.use(
  response => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    })
    return response
  },
  error => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message,
    })
    return Promise.reject(error)
  }
)

// ==========================
// Posts Service
// ==========================
export const postsService = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await api.get('/posts')
    return data
  },

  getPost: async (id: number): Promise<Post> => {
    const { data } = await api.get(`/posts/${id}`)
    return data
  },

  deletePost: async (id: string) => {
    const { data } = await api.delete(`/posts/${id}`)
    return data
  },
}

// ==========================
// Auth Functions (exportadas individualmente)
// ==========================
export async function login(identifier: string, password: string) {
  try {
    console.log('🔐 Attempting login...')
    const { data } = await api.post('/auth/local', { identifier, password })
    console.log('✅ Login successful!')
    return data
  } catch (error: any) {
    console.error('❌ Login failed:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message || error.message,
      details: error.response?.data,
    })
    throw error
  }
}

export async function register(username: string, email: string, password: string) {
  try {
    console.log('📝 Attempting register...')
    const { data } = await api.post('/auth/local/register', { username, email, password })
    console.log('✅ Register successful!')
    return data
  } catch (error: any) {
    console.error('❌ Register failed:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message || error.message,
      details: error.response?.data,
    })
    throw error
  }
}

export async function getMe(token: string) {
  try {
    console.log('👤 Fetching user profile...')
    const { data } = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log('✅ User profile fetched!')
    return data
  } catch (error: any) {
    console.error('❌ Failed to fetch user profile:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message || error.message,
    })
    throw error
  }
}

// ==========================
// Auth Service (para compatibilidad)
// ==========================
export const authService = {
  login: (email: string, password: string) => login(email, password),
  register: (username: string, email: string, password: string) =>
    register(username, email, password),
}

// ==========================
// Export default api instance
// ==========================
export default api
