import { useQuery } from "@tanstack/react-query";
import { getSupplierById } from "@/api/SuppliersAPI";
import { Supplier } from "@/types/types";

export const useSupplierById= (supplierId: Supplier['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['supplier', supplierId],
    queryFn: () => getSupplierById(supplierId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};