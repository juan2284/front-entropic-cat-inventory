import { useQuery } from "@tanstack/react-query";
import { getPaymentsByCustomer } from "@/api/CustomersAPI";
import { Customer } from "@/types/types";

export const usePaymentsByCustomer = (customerId: Customer['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['paymentsByCustomer', customerId],
    queryFn: () => getPaymentsByCustomer(customerId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  let totalAmountPending: number = 0;
  data?.map(payment => {
    totalAmountPending = totalAmountPending + payment.pending_amount;
  });

  return { data, isError, isLoading, totalAmountPending };
};