import { getPayments } from "@/api/PaymentsAPI";
import { Payments, Stocktaking } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const usePayments = (transactions?: Stocktaking['transactions']) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
    retry: 1,
    refetchOnWindowFocus: false
  });
  
  const paymentTransactions: Payments = [];
  transactions?.map(transaction => {
    data?.map(payment => {
      transaction.payment._id === payment._id ? paymentTransactions.push(payment) : null;
    });
  });

  const totalData = data ? data?.length : 0;
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData / skipData);
  const payments: Payments = data ? data.filter(customer => (data?.indexOf(customer) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (data?.indexOf(customer) + 1) <= (Number(pageSelected) * skipData)) : [];

  const headersTable = {
    total_amount: 'monto_total',
    customer_name: 'cliente',
    products: 'cant_productos',
    amount_one: 'monto_bs',
    amount_two: 'monto_divisa',
    amount_three: 'monto_tdc',
    settlement_date: 'fecha_compra',
    pending_amount: 'monto_pendiente',
    status: 'estatus_pago',
    currency_rate: 'tasa_cambio'
  };

  const paymentsData: {}[] = [];
  data?.map(payment => {
    const reportPayment = {
      total_amount: payment.total_amount,
      customer_name: `${payment.customer.name} ${payment.customer.last_name}`,
      products: payment.products.reduce((collector, product) => collector + product.quantity, 0),
      amount_one: payment.amount_one,
      amount_two: payment.amount_two,
      amount_three: payment.amount_three,
      settlement_date: payment.settlement_date,
      pending_amount: payment.pending_amount,
      status: payment.status,
      currency_rate: payment.currency_rate
    };
    paymentsData.push(reportPayment);
  });

  const paginationData = {
    totalData,
    skipData,
    pagesData,
    headersTable,
    paymentsData
  };

  return { data, isError, isLoading, paymentTransactions, paginationData, payments };
};