import { getUser } from '@/api/AuthAPI';
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};