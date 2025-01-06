import { useStocksByProduct } from "@/hooks/productsHooks/useStocksByProduct";
import { ListActions } from "@/reducers/customerReducer";
import { Dispatch } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/types/types";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import StockLayoutTable from "@/components/products/StockLayoutTable";
import Loader from "../globals/Loader";

type PartialStocksProps = {
  state: {
    productDetails: Product;
    stocksFilter: string;
  },
  dispatch: Dispatch<ListActions>;
};

export default function PartialStocks({state, dispatch}: PartialStocksProps) {
  const params = useParams();
  const productId = params.productId;
  const { data, isLoading, isError, stocksToView, totalAmountPending, activeStocks } = useStocksByProduct(productId!, state.stocksFilter);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <header className="w-full mx-auto mt-6 mb-2 flex flex-row justify-center items-center gap-2 border-b border-b-gray-300">
        <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Inventarios Totales:</h4>
        <h6 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">{data.length}</h6>
        <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">|</h4>
        <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Inventarios con Existencias:</h4>
        <h6 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">{activeStocks}</h6>
      </header>

      <section className={`w-full`}>
        <nav className={`w-full flex flex-row justify-center items-center gap-2 mb-2 transition-all ease-in-out duration-500`}>
          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-stocks', payload: { filter: 'todos' } })}
            title="Filtrar Inventarios"
          >
            <div className={`${state?.stocksFilter !== 'todos' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Todos
          </button>

          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-green-500 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-green-600 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-stocks', payload: { filter: 'paid' } })}
            title="Filtrar Inventarios"
          >
            <div className={`${state?.stocksFilter !== 'paid' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Pagados
          </button>

          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-red-600 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-red-700 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-stocks', payload: { filter: 'pending' } })}
            title="Filtrar Inventarios"
          >
            <div className={`${state?.stocksFilter !== 'pending' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Pendientes
          </button>
        </nav>

        <main className="flex flex-col justify-center items-center gap-2">
            <div className="w-full border-b border-b-gray-300 p-2">
              <StockLayoutTable stocks={stocksToView} />
            </div>
        </main>

        <h5 className="text-xs text-gray-700 font-roboto font-bold text-end p-4 uppercase">Monto Total Pendiente: <span className="font-semibold text-red-600">{formatCurrencyLocal(totalAmountPending)}</span></h5>

      </section>
    </>
  );
}