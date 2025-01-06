import { useQuery } from "@tanstack/react-query";
import { getServicesByCustomer } from "@/api/CustomersAPI";
import { Customer } from "@/types/types";

export const useServicesByCustomer= (customerId: Customer['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['services', customerId],
    queryFn: () => getServicesByCustomer(customerId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};