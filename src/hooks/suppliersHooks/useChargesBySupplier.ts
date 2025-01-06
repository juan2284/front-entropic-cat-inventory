import { useQuery } from "@tanstack/react-query";
import { getChargesBySupplier } from "@/api/SuppliersAPI";
import { Charges, Supplier } from "@/types/types";

export const useChargesBySupplier = (supplierId: Supplier['_id'], filter?: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['chargesBySupplier', supplierId],
    queryFn: () => getChargesBySupplier(supplierId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  const charges: Charges | undefined = data?.filter(charge => charge.status === filter);
  const chargesToView: Charges | undefined = charges?.length === 0 ? data! : charges!;

  let totalAmountPending: number = 0;
  data?.map(charge => {
    totalAmountPending = totalAmountPending + charge.pending_amount;
  });

  return { data, isError, isLoading, chargesToView, totalAmountPending };
};