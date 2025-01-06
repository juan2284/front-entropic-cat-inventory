import { getStocks } from "@/api/StocktakingsAPI";
import { SalesXProduct, Stocktaking, Stocktakings } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const useStocktaking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['stocktakings'],
    queryFn: getStocks,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const activeStock: Stocktakings | undefined = data?.filter((stock: Stocktaking) => stock.stock_out === true);
  const inactiveStock: Stocktakings | undefined = data?.filter((stock: Stocktaking) => stock.stock_out === false);

  let pendingAmount = 0;
  let pendingStocks = 0;
  data?.map((stock: Stocktaking) => {
    pendingAmount += stock.charge.pending_amount;
    pendingStocks += stock.charge.pending_amount !== 0 ? 1 : 0;
  });

  const headersTableSales = {
    id: 'transaccion',
    code: 'codigo',
    product: 'producto',
    saleDate: 'fecha_compra',
    quantity: 'cantidad'
  };

  const salesXProduct: SalesXProduct = [];
  activeStock?.map(stock => {
    stock.transactions.map(transaction => {
      const productTransaction = {
        id: transaction._id,
        code: stock.product.code,
        product: stock.product.name,
        saleDate: transaction.payment.settlement_date,
        quantity: String(transaction.quantity)
      };

      salesXProduct.push(productTransaction);
    });
  });

  const totalDataSales = salesXProduct ? salesXProduct?.length : 0;
  const skipDataSales = Number(skipSelected);
  const pagesDataSales = Math.ceil(totalDataSales / skipDataSales);
  const sales: SalesXProduct = salesXProduct ? salesXProduct.filter(sale => (salesXProduct?.indexOf(sale) + 1) >= ((skipDataSales * (Number(pageSelected) - 1)) + 1) && (salesXProduct?.indexOf(sale) + 1) <= (Number(pageSelected) * skipDataSales)) : [];

  const paginationDataSales = {
    totalData: totalDataSales,
    skipData: skipDataSales,
    pagesData: pagesDataSales,
    headersTable: headersTableSales
  };

  const totalData = Number(data ? activeStock?.length : 0);
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData ? totalData / skipData : 0);
  const stocks: Stocktakings | undefined = data ? activeStock?.filter(customer => (activeStock?.indexOf(customer) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (activeStock?.indexOf(customer) + 1) <= (Number(pageSelected) * skipData)) : [];

  const headersTable = {
    product: 'producto',
    supplier: 'proveedor',
    quantity: 'cantidad',
    amount: 'monto_compra',
    status: 'estatus_pago',
    sales: 'ventas',
    stock: 'existencia',
    statusStock: 'estatus_activacion'
  };

  const stocksData: {}[] = [];
  activeStock?.map(stock => {
    const reportStock = {
      product: stock.product.name,
      supplier: `${stock.supplier.name} ${stock.supplier.last_name}`,
      quantity: String(stock.quantity),
      amount: String(stock.charge.total_amount),
      status: stock.charge.status,
      sales: String(stock.transactions.reduce((collector, product) => collector + product.quantity, 0)),
      stock: String(stock.remaining),
      statusStock: stock.stock_out
    };
    stocksData.push(reportStock);
  });
  
    const paginationData = {
      totalData,
      skipData,
      pagesData,
      headersTable,
      stocksData
    };

  return { data, isError, isLoading, activeStock, inactiveStock, pendingAmount, pendingStocks, paginationData, stocks, salesXProduct, paginationDataSales, sales };
};