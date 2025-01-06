import { getChargeById } from "@/api/ChargesAPI";
import { Charge } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useChargeById = (chargeId: Charge['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['charge', chargeId],
    queryFn: () => getChargeById(chargeId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};