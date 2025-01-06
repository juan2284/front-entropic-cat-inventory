import { useQuery } from "@tanstack/react-query";
import { Charge } from "@/types/types";
import { getStockByCharge } from "@/api/ChargesAPI";

export const useStockByCharge = (chargeId: Charge['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['stocktaking', chargeId],
    queryFn: () => getStockByCharge(chargeId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};