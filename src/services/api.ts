import axios from 'axios'
import type { Post, Task, Category } from '@/types/api'

const api_token = "bcadf2a8f0affa1f3cb8e42779ca408103213c9b1c24f43b0ac1f8e1ffa5e21bd2b260d9afc34c048a10476be6244982b7af46565d2ccd48e8f4304af70a55743b96471bd2d41d2396439f108b909fa6024f80b5bcc613156d763fe9e935f4b364eeca6b38fc0d797427cf531e0d1c648e1970b3e3832fdf27bed5cacc39d9bd";

// Base API configuration
const api = axios.create({
  baseURL: "http://localhost:1337/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api_token}`
  }
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
    const response = await api.get('/tasks?populate=category')
    return response.data.data
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories')
    return response.data.data
  }
}

// Export the axios instance for custom requests if needed
export { api }
