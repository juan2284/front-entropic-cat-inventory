import AmortizationButton from "@/components/charges/AmortizationButton";
import AmortizationForm from "@/components/charges/AmortizationForm";
import ChargeDetails from "@/components/charges/ChargeDetails";
import ChargesTable from "@/components/charges/ChargesTable";
import TransactionsByCharge from "@/components/charges/TransactionsByCharge";
import Loader from "@/components/globals/Loader";
import { useChargeById } from "@/hooks/chargesHooks/useChargeById";
import { ListActions } from "@/reducers/customerReducer";
import { Charge, Charges } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { CreditCardIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type ChargeDetailsViewProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    searchCharge: Charges;
    chargeDetails: Charge;
  },
  dispatch: Dispatch<ListActions>;
};

export default function ChargeDetailsView({state, dispatch}: ChargeDetailsViewProps) {
  const params = useParams();
  const navigate = useNavigate();
  const chargeId: Charge['_id'] = state.chargeDetails._id ? state.chargeDetails._id : params.chargeId!;
  const { data, isLoading, isError } = useChargeById(chargeId);

  const handleDownload = () => {
    navigate(`/compra-pdf/${chargeId}`);
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
            to={'/pagos'}
            className="w-1/5 bg-indigo-600 text-xs font-roboto text-center hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => { dispatch({ type: 'show-details', payload: { result: false } }); dispatch({ type: 'clear-states' }) }}
          >Regresar</Link>
          <h3
            className="w-4/5 font-black text-2xl text-slate-700 my-2 text-center flex flex-row justify-center items-center gap-2"
          >#{data?._id.slice(-5)} - {formatDate(data?.settlement_date)}<CreditCardIcon className="w-6 h-6 text-indigo-600" /></h3>
          <button
            className="w-1/5 bg-green-600 text-xs font-roboto text-center hover:bg-green-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={handleDownload}
          >Ver PDF</button>
        </div>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600 mb-2">Pago</h4>
          <ChargesTable state={state} charges={[data!]} dispatch={dispatch} />

          {data?.status === 'pending' ? (
            <AmortizationButton dispatch={dispatch} />
          ) : null}
        </article>

        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mt-4">
            <article>
              <h4 className="pt-2 text-xl font-oswald text-gray-600 mb-2">Amortizar Deuda:</h4>
              <AmortizationForm charge={data!} dispatch={dispatch} />
            </article>
          </section>
        )}

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Detalles</h4>
          <ChargeDetails charge={data!} />
        </article>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600 mb-2">Transacciones</h4>
          <TransactionsByCharge chargeId={chargeId} />
        </article>
      </section>
    </>
  );
}