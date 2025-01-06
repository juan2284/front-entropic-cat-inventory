import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/api/CustomersAPI";
import { usePayments } from "../paymentsHooks/usePayments";
import { Customers, TransactionsCustomersDetailsType } from "@/types/types";
import { useLocation } from "react-router-dom";


export const useCustomers = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
    retry: 1,
    refetchOnWindowFocus: false
  });
  const {data: payments} = usePayments();

  const transactionsCustomersDetails: TransactionsCustomersDetailsType = {
    grossAmountPurchases: 0,
    totalAmountReceived: 0,
    totalAmountPending: 0,
    totalQuantityProducts: 0,
    totalNumberTransactions: 0,
    totalCurrencyReceived: 0,
    totalLocalReceived: 0,
    totalCardReceived: 0,
    totalQuantityPending: 0,
    totalQuantityPaid: 0
  };

  payments?.map(payment => {
    transactionsCustomersDetails.grossAmountPurchases += payment.total_amount;
    transactionsCustomersDetails.totalAmountPending += payment.pending_amount;
    transactionsCustomersDetails.totalAmountReceived += (payment.total_amount - payment.pending_amount);
    payment.products.map(product => transactionsCustomersDetails.totalQuantityProducts += product.quantity);
    transactionsCustomersDetails.totalNumberTransactions += 1;
    transactionsCustomersDetails.totalCurrencyReceived += payment.amount_two;
    transactionsCustomersDetails.totalLocalReceived += payment.amount_one;
    transactionsCustomersDetails.totalCardReceived += payment.amount_three;
    transactionsCustomersDetails.totalQuantityPending += payment.status === 'pending' ? 1 : 0;
    transactionsCustomersDetails.totalQuantityPaid += payment.status === 'paid' ? 1 : 0;
  });

  const totalData = data ? data?.length : 0;
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData / skipData);
  const customers: Customers = data ? data.filter(customer => (data?.indexOf(customer) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (data?.indexOf(customer) + 1) <= (Number(pageSelected) * skipData)) : [];

  const headersTable = {
    _id: 'data_id',
    identity_number: 'numero de cedula',
    name: 'nombres',
    last_name: 'apellidos',
    telephone: 'telefono',
    email: 'email'
  };

  const paginationData = {
    totalData,
    skipData,
    pagesData,
    headersTable
  };

  return { data, isError, isLoading, transactionsCustomersDetails, paginationData, customers };
};