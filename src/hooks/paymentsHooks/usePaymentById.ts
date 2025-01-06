import { getPaymentById } from "@/api/PaymentsAPI";
import { Payment } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const usePaymentById = (paymentId: Payment['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['payment', paymentId],
    queryFn: () => getPaymentById(paymentId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};