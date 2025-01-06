import { getCharges } from "@/api/ChargesAPI";
import { Charges } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const useCharges = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['charges'],
    queryFn: getCharges,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const totalData = data ? data?.length : 0;
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData / skipData);
  const charges: Charges = data ? data.filter(customer => (data?.indexOf(customer) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (data?.indexOf(customer) + 1) <= (Number(pageSelected) * skipData)) : [];

  const headersTable = {
    total_amount: 'monto_total',
    supplier: 'proveedor',
    product: 'producto',
    quantity: 'cantidad',
    amount_one: 'monto_bs',
    amount_two: 'monto_divisa',
    amount_three: 'monto_tdc',
    settlement_date: 'fecha_compra',
    pending_amount: 'monto_pendiente',
    status: 'estatus_pago',
    currency_rate: 'tasa_cambio'
  };

  const chargesData: {}[] = [];
  data?.map(charge => {
    const reportCharge = {
      total_amount: charge.total_amount,
      supplier: `${charge.supplier.name} ${charge.supplier.last_name}`,
      products: charge.product.id.name,
      quantity: charge.product.quantity,
      amount_one: charge.amount_one,
      amount_two: charge.amount_two,
      amount_three: charge.amount_three,
      settlement_date: charge.settlement_date,
      pending_amount: charge.pending_amount,
      status: charge.status,
      currency_rate: charge.currency_rate
    };
    chargesData.push(reportCharge);
  });

  const paginationData = {
    totalData,
    skipData,
    pagesData,
    headersTable,
    chargesData
  };

  return { data, isError, isLoading, paginationData, charges };
};