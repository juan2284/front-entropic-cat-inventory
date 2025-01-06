import CustomersTable from "@/components/customers/CustomersTable";
import PaymentsDetailsTable from "@/components/customers/PaymentsDetailsTable";
import ServicesDetailsTable from "@/components/customers/ServicesDetailsTable";
import Loader from "@/components/globals/Loader";
import { useCustomerById } from "@/hooks/customersHooks/useCustomerById";
import { ListActions } from "@/reducers/customerReducer";
import { Customer } from "@/types/types";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type CustomersDetailsViewProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    customerDetails: Customer;
    paymentFilter: string;
  },
  dispatch: Dispatch<ListActions>;
};

export default function CustomersDetailsView({state, dispatch}: CustomersDetailsViewProps) {
  const params = useParams();
  const navigate = useNavigate();
  const customerId: Customer['_id'] = state.customerDetails._id ? state.customerDetails._id : params.customerId!;
  const { data, isLoading, isError } = useCustomerById(customerId);

  const handleDownload = () => {
    navigate(`/cliente-pdf/${customerId}`);
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
            to={'/clientes'}
            className="w-1/5 bg-indigo-600 text-xs font-roboto text-center hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => {dispatch({type: 'show-details', payload: {result: false}}); dispatch({type: 'clear-states'})}}
          >Regresar</Link>
          <h3
            className="w-4/5 font-black text-2xl text-slate-700 my-2 text-center flex flex-row justify-center items-center gap-2"
          >{data.name} {data.last_name} <UserCircleIcon className="w-6 h-6 text-indigo-600" /></h3>
          <button
            className="w-1/5 bg-green-600 text-xs font-roboto text-center hover:bg-green-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={handleDownload}
          >Ver PDF</button>
        </div>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <CustomersTable state={state!} customers={[data!]} dispatch={dispatch} />
        </article>
        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <PaymentsDetailsTable state={state!} dispatch={dispatch} />
        </article>
        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <ServicesDetailsTable state={state!} dispatch={dispatch} />
        </article>

      </section>
    </>
  );
}