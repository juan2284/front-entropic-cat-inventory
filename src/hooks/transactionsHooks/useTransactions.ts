import { getAllTransactions } from "@/api/TransactionsAPI";
import { Transaction, Transactions } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const useTransactions = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const totalData = data ? data?.length : 0;
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData / skipData);
  const transactions: Transactions = data ? data.filter((transaction: Transaction) => (data?.indexOf(transaction) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (data?.indexOf(transaction) + 1) <= (Number(pageSelected) * skipData)) : [];

  const headersTable = {
    transaction: 'transaccion',
    type: 'tipo_transaccion',
    total_amount: 'monto_total',
    amount_one: 'monto_bs',
    amount_two: 'monto_divisa',
    amount_three: 'monto_tdc',
    pending_amount: 'monto_pendiente',
    currency_rate: 'tasa_cambio',
    receiver: 'vendedor',
    paymentStatus: 'estatus_cobro',
    chargeStatus: 'estatus_pago',
    transactiondate: 'fecha_transaccion'
  };

  const transactionsData: {}[] = [];
  data?.map((transaction: Transaction) => {
    const reportTransaction = {
      transaction: transaction.payment?._id ? 'payment' : transaction.charge?._id ? 'charge' : 'N/A',
      type: transaction.type,
      total_amount: transaction.total_amount,
      amount_one: transaction.amount_one,
      amount_two: transaction.amount_two,
      amount_three: transaction.amount_three,
      pending_amount: transaction.pending_amount,
      currency_rate: transaction.currency_rate,
      receiver: transaction.receiver,
      paymentStatus: transaction.payment?._id ? `${transaction.payment.status}` : 'N/A',
      chargeStatus: transaction.charge?._id ? `${transaction.charge.status}` : 'N/A',
      transactionDate: transaction.date
    };
    transactionsData.push(reportTransaction);
  });

  const paginationData = {
    totalData,
    skipData,
    pagesData,
    headersTable,
    transactionsData
  };

  return { data, isError, isLoading, paginationData, transactions};
};