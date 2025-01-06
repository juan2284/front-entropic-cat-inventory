import { useQuery } from "@tanstack/react-query";
import { getStockByProduct } from "@/api/ProductsAPI";
import { formatDate } from "@/utils/dateFormatter";
import { weekGenerate } from "@/utils/weekGenerate";
import { Product, Stocktaking, Stocktakings } from "@/types/types";

export const useStocksByProduct = (productId: Product['_id'], filter?: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['stockProduct', productId],
    queryFn: () => getStockByProduct(productId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  let globalStock = 0;
  let sales = 0;
  let partialStock = data?.length;
  let globalQuantity = 0;
  let salesDates: { date: string, quantity: number }[] = [];
  let salesWeek: number[] = [0, 0, 0, 0, 0, 0, 0];
  data?.map((stock: Stocktaking) => {
    globalStock = stock.stock_out === true ? globalStock + stock.remaining : globalStock;
    stock.transactions.map(transaction => {
      sales = stock.stock_out === true ? sales + transaction.quantity : sales;
      const fourHours = 4 * 60 * 60 * 1000;
      const date: Date = new Date(transaction.payment?.settlement_date);
      const realDate = new Date(date.getTime() + fourHours);
      salesDates.push({ date: formatDate(realDate.toISOString()), quantity: transaction.quantity });
    });
    globalQuantity = stock.stock_out === true ? globalQuantity + stock.quantity : globalQuantity;
  });

  const stocks: Stocktakings | undefined = data?.filter((stock: Stocktaking) => stock.charge.status === filter);
  const stocksToView: Stocktakings | undefined = stocks?.length === 0 ? data : stocks;

  let totalAmountPending: number = 0;
  data?.map((stock: Stocktaking) => {
    totalAmountPending = totalAmountPending + stock.charge.pending_amount;
  });

  const activeStocks = data?.filter((stock: Stocktaking) => stock.stock_out !== false).length;

  const stockBar = Math.floor(globalStock / globalQuantity * 100) || 0;

  const { week, labels } = weekGenerate();
  salesDates.map(sale => {
    week.map(day => {
      sale.date === day ? salesWeek[Number(week.indexOf(day)) * 1] += sale.quantity : salesWeek[Number(week.indexOf(day)) * 1] += 0;
    });
    salesWeek.push();
  });

  const classes = [];
  for (let i = 1; i < 101; i++) {
    const classObject = {
      value: i,
      class: `${i}%`
    };
    classes.push(classObject);
  }
  const widthClassStockBar = classes.filter(clss => clss.value === stockBar).length !== 0 ? classes.filter(clss => clss.value === stockBar)[0].class : '0%';

  return {
    data,
    isError,
    isLoading,
    globalStock,
    stockBar,
    globalQuantity,
    sales,
    partialStock,
    labels,
    salesWeek,
    stocks,
    stocksToView,
    totalAmountPending,
    activeStocks,
    widthClassStockBar
  };
};