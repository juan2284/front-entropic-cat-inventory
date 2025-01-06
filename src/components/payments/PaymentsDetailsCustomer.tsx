import { usePaymentsByCustomer } from "@/hooks/customersHooks/usePaymentsByCustomer";
import { Customer } from "@/types/types";
import PaymentsTable from "@/components/customers/PaymentsTable";
import Loader from "../globals/Loader";

type PaymentsDetailsCustomerProps = {
  customer: Customer;
};

export default function PaymentsDetailsCustomer({customer}: PaymentsDetailsCustomerProps) {
  const { data, isLoading, isError, totalAmountPending } = usePaymentsByCustomer(customer._id);
  const paymentsPending = data?.filter(payment => payment.status === 'pending');

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      {paymentsPending?.length !== 0 ? (
        <section className={`w-full`}>
          <PaymentsTable payments={paymentsPending!} />
          <h5 className="text-center text-xs text-gray-700 font-roboto font-bold p-4 uppercase">Monto Total Pendiente: <span className="font-semibold text-red-600">{totalAmountPending}</span></h5>
        </section>
      ) : (
        <h5 className="text-xs text-gray-700 font-roboto font-bold text-center uppercase">Cliente sin Deudas Pendientes</h5>
      )}
    </>
  );
}