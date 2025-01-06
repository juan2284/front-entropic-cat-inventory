import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "@/api/CustomersAPI";
import { Customer } from "@/types/types";

export const useCustomerById= (customerId: Customer['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomerById(customerId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};