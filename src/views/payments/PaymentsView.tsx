import Loader from "@/components/globals/Loader";
import Logo from "@/components/globals/Logo";
import PaginationReports from "@/components/globals/PaginationReports";
import DeletePaymentModal from "@/components/payments/DeletePaymentModal";
import HeaderPayments from "@/components/payments/HeaderPayments";
import PaymentsTable from "@/components/payments/PaymentsTable";
import SearchPayment from "@/components/payments/SearchPayment";
import SelectFilterPaymentsModal from "@/components/payments/SelectFilterPaymentsModal";
import { useCustomers } from "@/hooks/customersHooks/useCustomers";
import { usePayments } from "@/hooks/paymentsHooks/usePayments";
import { ListActions } from "@/reducers/customerReducer";
import { Payment, Payments } from "@/types/types";
import { FunnelIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link } from "react-router-dom";

type PaymentsViewProps = {
  state: {
    show: boolean;
    viewAddCustomer: boolean;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    payments: Payments;
    paymentDetails: Payment;
    searchPayment: Payments;
  },
  dispatch: Dispatch<ListActions>;
};

export default function PaymentsView({state, dispatch}: PaymentsViewProps) {
  const { data, isLoading, isError, paginationData, payments } = usePayments();
  const { transactionsCustomersDetails } = useCustomers();
  const paginatedPayments = state?.payments.length !== 0 ? state?.payments : payments;

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Transacciones Registrados</h4>

      <Link
        className="w-1/4 flex flex-row justify-center items-center gap-1 p-2 mt-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300"
        to={'/agregar-cobro'}
      >
        <PlusCircleIcon className="w-4 h-4" />
        Agregar Cobro
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
        <SearchPayment dispatch={dispatch} payments={data!} />
        <HeaderPayments data={transactionsCustomersDetails} />
      </header>

      <main className="p-4">
        {state?.searchPayment && state.searchPayment.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <PaymentsTable state={state!} payments={state.searchPayment} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Todos los Cobros</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <XMarkIcon
                  className={`${state?.payments.length !== 0 ? '' : 'hidden'} w-3 h-3 hover:text-indigo-500 cursor-pointer transition-all ease-in-out duration-300`}
                  title="Eliminar Filtros"
                  onClick={() => dispatch({ type: 'clear-filters' })}
                />
                <button
                  className="flex flex-row justify-between items-center gap-1 p-2 bg-gray-200 text-gray-600 rounded-sm font-semibold font-roboto text-xs hover:bg-gray-300 transition-all ease-in-out duration-300 relative"
                  onClick={() => dispatch({ type: 'show-modal' })}
                  title="Filtrar Cobros"
                >
                  <div className={`${state?.payments.length !== 0 ? '' : 'hidden'} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
                  <FunnelIcon className="w-3 h-3" />
                  Filtros
                </button>
                <Link
                  className={`${state?.viewAddCustomer ? 'hidden' : ''} flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300`}
                  to={'/agregar-cobro'}
                ><PlusCircleIcon className="w-4 h-4" />Agregar Cobro</Link>
              </div>
            </div>

            <div className="border-y border-y-gray-300 my-2 p-1">
              <PaginationReports paginationData={paginationData} dataName="Cobros Efectuados" />
            </div>

            <PaymentsTable state={state} payments={paginatedPayments!} dispatch={dispatch} />
          </article>
        </section>
      </main>

      <SelectFilterPaymentsModal payments={paginatedPayments!} state={state!} dispatch={dispatch} />
      <DeletePaymentModal state={state!} dispatch={dispatch} />
    </>
  );
}