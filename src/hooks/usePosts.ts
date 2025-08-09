import { useQuery } from '@tanstack/react-query'
import { apiService } from '@/services/api'

// Hook to fetch all posts with loading, error states, and caching
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: apiService.getPosts,
  })
}

// Hook to fetch a single post
export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => apiService.getPost(id),
    enabled: !!id, // Only run query if id exists
  })
}
