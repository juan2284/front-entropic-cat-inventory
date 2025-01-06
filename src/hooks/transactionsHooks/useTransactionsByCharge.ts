import { useQuery } from "@tanstack/react-query";
import { Charge } from "@/types/types";
import { getTransactionsByCharge } from "@/api/TransactionsAPI";

export const useTransactionsByCharge = (chargeId: Charge['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['transactionsByCharge', chargeId],
    queryFn: () => getTransactionsByCharge(chargeId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};