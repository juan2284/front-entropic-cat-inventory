import Loader from "@/components/globals/Loader";
import StockPartialDetails from "@/components/stocktaking/StockPartialDetails";
import StocksTable from "@/components/stocktaking/StocksTable";
import StockTransactionsTable from "@/components/stocktaking/StockTransactionsTable";
import { usePayments } from "@/hooks/paymentsHooks/usePayments";
import { useStockById } from "@/hooks/stocktakingHooks/useStocktakingById";
import { ListActions } from "@/reducers/customerReducer";
import { Product, Stocktaking, Stocktakings } from "@/types/types";
import { CubeTransparentIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link, useParams } from "react-router-dom";

type StockDetailsViewProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    searchStock: Stocktakings;
    stockDetails: Stocktaking;
    productDetails: Product;
    stocksFilter: string;
  },
  dispatch: Dispatch<ListActions>;
};

export default function StockDetailsView({state, dispatch}: StockDetailsViewProps) {
  const params = useParams();
  const stockId: Stocktaking['_id'] = state.stockDetails._id ? state.stockDetails._id : params.stockId!;
  const { data, isLoading, isError } = useStockById(stockId);
  const { paymentTransactions } = usePayments(data?.transactions);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <section className="p-4">
        <div className="w-full flex md:flex-row justify-center items-center gap-2 mb-4">
          <Link
            to={'/inventario'}
            className="w-1/5 bg-indigo-600 text-xs font-roboto text-center hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => { dispatch({ type: 'show-details', payload: { result: false } }); dispatch({ type: 'clear-states' }) }}
          >Regresar</Link>
          <h3
            className="w-4/5 font-black text-2xl text-slate-700 my-2 text-center flex flex-row justify-center items-center gap-2"
          >{data?.product.name} <CubeTransparentIcon className="w-6 h-6 text-indigo-600" /></h3>
        </div>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600 mb-2">Inventario</h4>
          <StocksTable state={state} stocks={[data!]} dispatch={dispatch} />
        </article>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Detalles</h4>
          <StockPartialDetails stock={data!} />
        </article>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600 mb-2">Transacciones</h4>
          <StockTransactionsTable stock={data!} transactions={paymentTransactions} />
        </article>
      </section>
    </>
  );
}