import ChargesTable from "@/components/charges/ChargesTable";
import DeleteChargeModal from "@/components/charges/DeleteChargeModal";
import HeaderCharges from "@/components/charges/HeaderCharges";
import SearchCharge from "@/components/charges/SearchCharge";
import SelectFilterChargesModal from "@/components/charges/SelectFilterChargesModal";
import Loader from "@/components/globals/Loader";
import Logo from "@/components/globals/Logo";
import PaginationReports from "@/components/globals/PaginationReports";
import { useCharges } from "@/hooks/chargesHooks/useCharges";
import { useSuppliers } from "@/hooks/suppliersHooks/useSuppliers";
import { ListActions } from "@/reducers/customerReducer";
import { Charge, Charges } from "@/types/types";
import { FunnelIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link } from "react-router-dom";

type ChargesViewProps = {
  state: {
    show: boolean;
    viewAddCustomer: boolean;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    charges: Charges;
    chargeDetails: Charge;
    searchCharge: Charges;
  },
  dispatch: Dispatch<ListActions>;
};

export default function ChargesView({state, dispatch}: ChargesViewProps) {
  const { data, isLoading, isError, paginationData, charges } = useCharges();
  const { transactionsSuppliersDetails } = useSuppliers();
  const chargesPaginated = state?.charges.length !== 0 ? state?.charges : charges;

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Solicitudes Registradas</h4>

      <Link
        className="w-1/4 flex flex-row justify-center items-center gap-1 p-2 mt-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300"
        to={'/agregar-pago'}
      >
        <PlusCircleIcon className="w-4 h-4" />
        Agregar Pago
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
        <SearchCharge dispatch={dispatch} charges={data!} />
        <HeaderCharges data={transactionsSuppliersDetails} />
      </header>

      <main className="p-4">
        {state?.searchCharge && state.searchCharge.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <ChargesTable state={state!} charges={state.searchCharge} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Todos los Pagos</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <XMarkIcon
                  className={`${state?.charges.length !== 0 ? '' : 'hidden'} w-3 h-3 hover:text-indigo-500 cursor-pointer transition-all ease-in-out duration-300`}
                  title="Eliminar Filtros"
                  onClick={() => dispatch({ type: 'clear-filters' })}
                />
                <button
                  className="flex flex-row justify-between items-center gap-1 p-2 bg-gray-200 text-gray-600 rounded-sm font-semibold font-roboto text-xs hover:bg-gray-300 transition-all ease-in-out duration-300 relative"
                  onClick={() => dispatch({ type: 'show-modal' })}
                  title="Filtrar Pagos"
                >
                  <div className={`${state?.charges.length !== 0 ? '' : 'hidden'} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
                  <FunnelIcon className="w-3 h-3" />
                  Filtros
                </button>
                <Link
                  className={`${state?.viewAddCustomer ? 'hidden' : ''} flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300`}
                  to={'/agregar-pago'}
                ><PlusCircleIcon className="w-4 h-4" />Agregar Pago</Link>
              </div>
            </div>

            <div className="border-y border-y-gray-300 my-2 p-1">
              <PaginationReports paginationData={paginationData} dataName="Clientes Registrados" />
            </div>

            <ChargesTable state={state} charges={chargesPaginated!} dispatch={dispatch} />
          </article>
        </section>
      </main>

      <SelectFilterChargesModal charges={chargesPaginated!} state={state!} dispatch={dispatch} />
      <DeleteChargeModal state={state!} dispatch={dispatch} />
    </>
  );
}