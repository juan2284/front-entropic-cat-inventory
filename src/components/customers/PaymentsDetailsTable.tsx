import { usePaymentsByCustomer } from "@/hooks/customersHooks/usePaymentsByCustomer";
import { ListActions } from "@/reducers/customerReducer";
import { Dispatch } from "react";
import { useParams } from "react-router-dom";
import PaymentsTable from "@/components/customers/PaymentsTable";
import { Customer, Payments } from "@/types/types";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import Loader from "../globals/Loader";

type PaymentsDetailsTableProps = {
  state: {
    customerDetails: Customer;
    paymentFilter: string;
  },
  dispatch: Dispatch<ListActions>;
};

export default function PaymentsDetailsTable({state, dispatch}: PaymentsDetailsTableProps) {
  const params = useParams();
  const customerId: Customer['_id'] = state.customerDetails._id || params.customerId!;
  const { data, isLoading, isError, totalAmountPending } = usePaymentsByCustomer(customerId);
  const payments: Payments | undefined = data?.filter(payment => payment.status === state.paymentFilter);
  const paymentsToView: Payments | undefined = payments?.length === 0 ? data! : payments!;
  
  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <div className="w-full mx-auto mt-6 mb-2 flex flex-row justify-center items-center gap-2 border-b border-b-gray-300">
        <h4 className="text-center text-gray-600 text-xl font-oswald">Transacciones</h4>
      </div>

      <section className={`w-full`}>
        <div className={`w-full flex flex-row justify-center items-center gap-2 mb-2 transition-all ease-in-out duration-500`}>
          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-payments', payload: { filter: 'todos' } })}
            title="Filtrar Clientes"
          >
            <div className={`${state?.paymentFilter !== 'todos' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Todos
          </button>

          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-green-500 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-green-600 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-payments', payload: { filter: 'paid' } })}
            title="Filtrar Clientes"
          >
            <div className={`${state?.paymentFilter !== 'paid' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Pagados
          </button>

          <button
            className={`flex flex-row justify-between items-center gap-1 p-2 bg-red-600 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-red-700 transition-all ease-in-out duration-300 relative`}
            onClick={() => dispatch({ type: 'filter-payments', payload: { filter: 'pending' } })}
            title="Filtrar Clientes"
          >
            <div className={`${state?.paymentFilter !== 'pending' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
            Pendientes
          </button>
        </div>

        <PaymentsTable payments={paymentsToView} />
        <h5 className="text-xs text-gray-700 font-roboto font-bold text-end p-4 uppercase">Monto Total Pendiente: <span className="font-semibold text-red-600">{formatCurrencyLocal(totalAmountPending)}</span></h5>

      </section>
    </>
  );
}