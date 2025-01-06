import { getServiceByPayment } from "@/api/ServicesAPI";
import { Service } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useServiceByPayment = (paymentId: Service['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['serviceByPayment', paymentId],
    queryFn: () => getServiceByPayment(paymentId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};