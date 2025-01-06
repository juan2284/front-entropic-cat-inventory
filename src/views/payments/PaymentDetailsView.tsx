import AmortizationButton from "@/components/charges/AmortizationButton";
import Loader from "@/components/globals/Loader";
import PaymentAmortizationForm from "@/components/payments/PaymentAmortizationForm";
import PaymentDetailsTable from "@/components/payments/PaymentDetailsTable";
import PaymentProductsTable from "@/components/payments/PaymentProductsTable";
import PaymentsTable from "@/components/payments/PaymentsTable";
import TransactionsByPayment from "@/components/payments/TransactionsByPayment";
import ServicesTable from "@/components/services/ServicesTable";
import { usePaymentById } from "@/hooks/paymentsHooks/usePaymentById";
import { useServiceByPayment } from "@/hooks/ServicesHooks/useServiceByPayment";
import { ListActions } from "@/reducers/customerReducer";
import { Payment, Payments } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { BanknotesIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "lucide-react";
import { Dispatch } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type PaymentDetailsViewProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    searchPayment: Payments;
    paymentDetails: Payment;
  },
  dispatch: Dispatch<ListActions>;
};

export default function PaymentDetailsView({state, dispatch}: PaymentDetailsViewProps) {
  const params = useParams();
  const navigate = useNavigate();
  const paymentId: Payment['_id'] = state.paymentDetails._id ? state.paymentDetails._id : params.paymentId!;
  const { data, isLoading, isError } = usePaymentById(paymentId);
  const { data: servicePayment } = useServiceByPayment(paymentId);

  const handleDownload = () => {
    navigate(`/factura-pdf/${paymentId}`);
  };

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
            to={'/cobros'}
            className="w-1/5 bg-indigo-600 text-xs font-roboto text-center hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => { dispatch({ type: 'show-details', payload: { result: false } }); dispatch({ type: 'clear-states' }) }}
          >Regresar</Link>
          <h3
            className="w-4/5 font-black text-2xl text-slate-700 my-2 text-center flex flex-row justify-center items-center gap-2"
          >#{data?._id.slice(-5)} - {formatDate(data?.settlement_date)}<BanknotesIcon className="w-6 h-6 text-indigo-600" /></h3>
          <button
            className="w-1/5 bg-green-600 text-xs font-roboto text-center hover:bg-green-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={handleDownload}
          >Ver PDF</button>
        </div>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600 mb-2">Pago</h4>
          <PaymentsTable state={state} payments={[data!]} dispatch={dispatch} />

          {data?.status === 'pending' ? (
            <AmortizationButton dispatch={dispatch} />
          ) : null}
        </article>

        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mt-4">
            <article>
              <h4 className="pt-2 text-xl font-oswald text-gray-600 mb-2">Amortizar Deuda:</h4>
              <PaymentAmortizationForm payment={data!} dispatch={dispatch} />
            </article>
          </section>
        )}

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Detalles de la Compra</h4>
          <PaymentDetailsTable payment={data!} />
        </article>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600 mb-2">Productos Comprados</h4>
          <PaymentProductsTable products={data.products} />
        </article>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Transacciones Relacionadas</h4>
          <TransactionsByPayment paymentId={paymentId} />
        </article>

        {servicePayment?.length !== 0 ? (
          <article className="p-2 border border-gray-200 rounded-sm mt-4">
            <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Servicio</h4>
            <ServicesTable services={servicePayment!} />
          </article>
        ) : (
          <Link
            className={`flex flex-row justify-center items-center gap-1 p-2 bg-green-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-green-700 transition-all ease-in-out duration-300`}
            to={'/agregar-servicio'}
          ><PlusCircleIcon className="w-4 h-4" />Agregar Servicio</Link>  
        )}
      </section>
    </>
  );
}