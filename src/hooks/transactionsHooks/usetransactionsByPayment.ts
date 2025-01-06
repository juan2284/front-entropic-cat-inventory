import { useQuery } from "@tanstack/react-query";
import { Payment } from "@/types/types";
import { getTransactionsByPayment } from "@/api/TransactionsAPI";

export const useTransactionsByPayment = (paymentId: Payment['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['transactionsByPayment', paymentId],
    queryFn: () => getTransactionsByPayment(paymentId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};