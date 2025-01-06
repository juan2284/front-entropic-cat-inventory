import { useChargesBySupplier } from "@/hooks/suppliersHooks/useChargesBySupplier";
import { ListActions } from "@/reducers/customerReducer";
import { Dispatch } from "react";
import { useParams } from "react-router-dom";
import ChargesTable from "@/components/suppliers/ChargesTable";
import { Supplier } from "@/types/types";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import Loader from "../globals/Loader";

type ChargesDetailsTableProps = {
  state: {
    supplierDetails: Supplier;
    chargeFilter: string;
  },
  dispatch: Dispatch<ListActions>;
};

export default function ChargesDetailsTable({state, dispatch}: ChargesDetailsTableProps) {
  const params = useParams();
  const supplierId: Supplier['_id'] = state.supplierDetails._id || params.supplierId!;
  const { data, isLoading, isError, chargesToView, totalAmountPending } = useChargesBySupplier(supplierId, state.chargeFilter);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <div className="w-full mx-auto mt-6 mb-2 flex flex-row justify-center items-center gap-2 border-b border-b-gray-300">
        <h4 className="text-center text-gray-600 text-xl font-oswald">Pedidos</h4>
      </div>

      <section className={`w-full`}>
        <div className={`w-full flex flex-row justify-center items-center gap-2 mb-2 transition-all ease-in-out duration-500`}>
          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-charges', payload: { filter: 'todos' } })}
            title="Filtrar Movimientos"
          >
            <div className={`${state?.chargeFilter !== 'todos' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Todos
          </button>

          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-green-500 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-green-600 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-charges', payload: { filter: 'paid' } })}
            title="Filtrar Movimientos"
          >
            <div className={`${state?.chargeFilter !== 'paid' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Pagados
          </button>

          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-red-600 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-red-700 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-charges', payload: { filter: 'pending' } })}
            title="Filtrar Movimientos"
          >
            <div className={`${state?.chargeFilter !== 'pending' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Pendientes
          </button>
        </div>

        <ChargesTable charges={chargesToView} />
        <h5 className="text-xs text-gray-700 font-roboto font-bold text-end p-4 uppercase">Cuenta Por Pagar: <span className="font-semibold text-red-600">{formatCurrencyLocal(totalAmountPending)}</span></h5>

      </section>
    </>
  );
}