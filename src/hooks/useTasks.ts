import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: apiService.getTasks,
  });
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: apiService.getPosts,
  })
}