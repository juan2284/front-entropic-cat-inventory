import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "@/api/SuppliersAPI";
import { useCharges } from "../chargesHooks/useCharges";
import { Suppliers, TransactionsSuppliersDetailsType } from "@/types/types";
import { useLocation } from "react-router-dom";

export const useSuppliers = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
    retry: 1,
    refetchOnWindowFocus: false
  });
  const { data: charges } = useCharges();

  const transactionsSuppliersDetails: TransactionsSuppliersDetailsType = {
    grossAmount: 0,
    totalAmountDelivered: 0,
    totalAmountPending: 0,
    totalCurrencyDelivered: 0,
    totalLocalDelivered: 0,
    totalCardDelivered: 0,
    totalQuantityPending: 0,
    totalQuantityPaid: 0
  };

  charges?.map(charge => {
    transactionsSuppliersDetails.grossAmount += charge.total_amount;
    transactionsSuppliersDetails.totalAmountDelivered += (charge.total_amount - charge.pending_amount);
    transactionsSuppliersDetails.totalAmountPending += charge.pending_amount;
    transactionsSuppliersDetails.totalCurrencyDelivered += charge.amount_two;
    transactionsSuppliersDetails.totalLocalDelivered += charge.amount_one;
    transactionsSuppliersDetails.totalCardDelivered += charge.amount_three;
    transactionsSuppliersDetails.totalQuantityPending += charge.status === 'pending' ? 1 : 0;
    transactionsSuppliersDetails.totalQuantityPaid += charge.status === 'paid' ? 1 : 0;
  });

  let suppliers: {id: string, supplier: string}[] = [];
  data?.map(supplier => {
    const supplierExist = suppliers.filter(uniqueSupplier => uniqueSupplier.supplier === supplier.identity_number);
    if (supplierExist.length === 0) {
      const object = {
        id: supplier._id,
        supplier: supplier.identity_number
      };
      suppliers.push(object);
    }
  });

  const totalData = data ? data?.length : 0;
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData / skipData);
  const suppliersPaginated: Suppliers = data ? data.filter(customer => (data?.indexOf(customer) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (data?.indexOf(customer) + 1) <= (Number(pageSelected) * skipData)) : [];

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

  return { data, isError, isLoading, transactionsSuppliersDetails, suppliers, paginationData, suppliersPaginated };
};