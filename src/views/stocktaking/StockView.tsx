import Loader from "@/components/globals/Loader";
import Logo from "@/components/globals/Logo";
import PaginationReports from "@/components/globals/PaginationReports";
import HeaderProducts from "@/components/products/HeaderProducts";
import EditStockForm from "@/components/stocktaking/EditStockForm";
import SearchStock from "@/components/stocktaking/SearchStock";
import SelectFilterStocksModal from "@/components/stocktaking/SelectFilterStocksModal";
import StocksTable from "@/components/stocktaking/StocksTable";
import { useStocktaking } from "@/hooks/stocktakingHooks/useStocktaking";
import { ListActions } from "@/reducers/customerReducer";
import { Stocktaking, Stocktakings } from "@/types/types";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "lucide-react";
import { Dispatch } from "react";
import { Link } from "react-router-dom";

type StockViewProps = {
  state: {
    show: boolean;
    stocks: Stocktakings;
    searchStock: Stocktakings;
    viewAddCustomer: boolean;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    stockDetails: Stocktaking;
  },
  dispatch: Dispatch<ListActions>;
};

export default function StockView({state, dispatch}: StockViewProps) {
  const { data, isLoading, isError, activeStock, inactiveStock, pendingAmount, pendingStocks, paginationData } = useStocktaking();
  const stocksPaginated = state?.stocks.length !== 0 ? state?.stocks : activeStock;

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Stocks Registrados</h4>

      <Link
        className="w-1/4 flex flex-row justify-center items-center gap-1 p-2 mt-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300"
        to={'/agregar-pago'}
      >
        <PlusCircleIcon className="w-4 h-4" />
        Solicitar Stock
      </Link>
    </div>
  );
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <header>
        <SearchStock dispatch={dispatch} stocks={activeStock!} />
        <HeaderProducts />

        <div className="flex flex-row flex-wrap justify-start items-center border-b border-b-gray-200 p-2">
          <h4 className="w-1/4 text-xs text-center font-bold text-gray-500">Deuda Total por Inventarios: </h4>
          <h5 className="w-1/4 text-xl text-center font-bold text-indigo-600 border-e border-e-gray-200">{formatCurrencyLocal(pendingAmount)}</h5>
          <h4 className="w-1/4 text-xs text-center font-bold text-gray-500">Inventarios Pendientes por Pago: </h4>
          <h5 className="w-1/4 text-xl text-center font-bold text-indigo-600 border-e border-e-gray-200">{pendingStocks}</h5>
        </div>
      </header>

      <main className="p-4">
        {state?.searchStock && state.searchStock.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <StocksTable state={state!} stocks={state.searchStock} dispatch={dispatch} />
            </article>
          </section>
        )}

        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Editar Producto:</h4>
              <EditStockForm state={state} dispatch={dispatch} />
            </article>
          </section>
        )}
        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Inventarios Activos</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <XMarkIcon
                  className={`${state?.stocks.length !== 0 ? '' : 'hidden'} w-3 h-3 hover:text-indigo-500 cursor-pointer transition-all ease-in-out duration-300`}
                  title="Eliminar Filtros"
                  onClick={() => dispatch({ type: 'clear-filters' })}
                />
                <button
                  className="flex flex-row justify-between items-center gap-1 p-2 bg-gray-200 text-gray-600 rounded-sm font-semibold font-roboto text-xs hover:bg-gray-300 transition-all ease-in-out duration-300 relative"
                  onClick={() => dispatch({ type: 'show-modal' })}
                  title="Filtrar Clientes"
                >
                  <div className={`${state?.stocks.length !== 0 ? '' : 'hidden'} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
                  <FunnelIcon className="w-3 h-3" />
                  Filtros
                </button>
              </div>
            </div>

            <div className="border-y border-y-gray-300 my-2 p-1">
              <PaginationReports paginationData={paginationData} dataName="Inventarios Activos" />
            </div>

            <div className="m-auto grid grid-cols-1 gap-2 p-2">
              <StocksTable state={state} stocks={stocksPaginated!} dispatch={dispatch} />
            </div>

          </article>
        </section>
      </main>

      {inactiveStock?.length !== 0 ? (
        <main className="p-4">
          <section className="rounded-sm p-2 border border-gray-200">
            <article>
              <div className="flex flex-row justify-between items-center">
                <h4 className="py-2 text-xl font-oswald text-gray-600">Inventarios Inactivos</h4>
              </div>

              <div className="m-auto grid grid-cols-1 gap-2 p-2">
                <StocksTable state={state} stocks={inactiveStock!} dispatch={dispatch} />
              </div>

            </article>
          </section>
        </main>
      ) : (
        null
      )}

      <SelectFilterStocksModal state={state} stocks={activeStock!} dispatch={dispatch} />
    </>
  );
}