import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/ProductsAPI";
import { Product } from "@/types/types";

export const useProductById = (productId: Product['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};