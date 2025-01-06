import { useServicesByCustomer } from "@/hooks/customersHooks/useServicesByCustomer";
import { ListActions } from "@/reducers/customerReducer";
import { Dispatch } from "react";
import { useParams } from "react-router-dom";
import ServicesTable from "../services/ServicesTable";
import { Customer } from "@/types/types";
import Loader from "../globals/Loader";

type ServicesDetailsTableProps = {
  state: {
    customerDetails: Customer;
  },
  dispatch: Dispatch<ListActions>;
};

export default function ServicesDetailsTable({state}: ServicesDetailsTableProps) {
  const params = useParams();
  const customerId: Customer['_id'] = state.customerDetails._id || params.customerId!;
  const { data, isLoading, isError } = useServicesByCustomer(customerId);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <div
        className="w-full mx-auto mt-6 mb-2 flex flex-row justify-center items-center gap-2 border-b border-b-gray-300"
      >
        <h4 className="text-center text-gray-600 text-xl font-oswald">Servicios</h4>
      </div>

      <section className={`w-full`}>
        <ServicesTable services={data} />
      </section>
    </>
  );
}