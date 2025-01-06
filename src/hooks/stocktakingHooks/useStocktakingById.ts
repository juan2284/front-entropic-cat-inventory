import { useQuery } from "@tanstack/react-query";
import { Stocktaking } from "@/types/types";
import { getStockById } from "@/api/StocktakingsAPI";

export const useStockById = (stockId: Stocktaking['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['stocktaking', stockId],
    queryFn: () => getStockById(stockId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};