import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/services/api';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
};