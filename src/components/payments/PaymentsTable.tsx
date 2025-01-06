import { ListActions } from "@/reducers/customerReducer";
import { Payment, Payments } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import { QueueListIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";

type PaymentsTableProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    paymentDetails: Payment;
  };
  payments: Payments;
  dispatch: Dispatch<ListActions>;
};

export default function PaymentsTable({state, payments, dispatch}: PaymentsTableProps) {
  const navigate = useNavigate();

  const handleDelete = (payment: Payment) => {
    dispatch({ type: 'set-payment-details', payload: { payment } });
    dispatch({ type: 'show-delete' });
  };

  const handleDetails = (payment: Payment) => {
    dispatch({ type: 'set-payment-details', payload: { payment } });
    dispatch({ type: 'show-details', payload: { result: true } });
    navigate(`/cobros/${payment._id}`);
  };

  return (
    <>
      <table className={`w-full text-xs text-center`}>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>ID</th>
            <th className='font-light p-2 bg-gray-100'>Cliente</th>
            <th className='font-light p-2 bg-gray-100'>Monto Total</th>
            <th className='font-light p-2 bg-gray-100'>Fecha Transacción</th>
            <th className='font-light p-2 bg-gray-100'>Estado</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Productos</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Detalles</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {payments?.map(payment => (
            <tr className={`border-b border-b-gray-300 font-bold font-roboto text-gray-600`} key={payment._id}>
              <td className='p-2 text-gray-800'>#{payment._id.slice(-5)}</td>
              <td className='p-2 hover:text-gray-400' title="Ver Proveedor"><Link to={`/clientes/${payment.customer._id}`}>{payment.customer.name} {payment.customer.last_name}</Link></td>
              <td className='p-2'>{formatCurrencyLocal(payment.total_amount)}</td>
              <td className='p-2'>{formatDate(payment.settlement_date)}</td>
              <td className={`${payment.status === 'paid' ? 'text-green-600' : 'text-red-600'} p-2 uppercase`}>{payment.status === 'paid' ? 'pago' : 'pendiente'}</td>
              <td className='p-2'>{formatCurrencyLocal(payment.pending_amount)}</td>
              <td className='p-2'>{payment.products.length}</td>
              <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                <button
                  type="button"
                  className="w-full text-gray-400 flex justify-center items-center font-bold group"
                  onClick={() => handleDetails(payment)}
                  title="Detalles"
                >
                  <QueueListIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                </button>
              </td>
              <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                <button
                  type="button"
                  className="w-full text-gray-100 flex justify-center items-center font-bold group"
                  onClick={() => handleDelete(payment)}
                  title="Eliminar"
                >
                  <XCircleIcon className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-all ease-in-out duration-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}