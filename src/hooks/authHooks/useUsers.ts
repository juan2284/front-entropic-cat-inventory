import { getUsers } from '@/api/AuthAPI';
import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};