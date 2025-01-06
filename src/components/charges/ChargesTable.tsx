import { ListActions } from "@/reducers/customerReducer";
import { Charge, Charges } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import { QueueListIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";

type ChargesTableProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    chargeDetails: Charge;
  };
  charges: Charges;
  dispatch: Dispatch<ListActions>;
};

export default function ChargesTable({state, charges, dispatch}: ChargesTableProps) {
  const navigate = useNavigate();

  const handleDelete = (charge: Charge) => {
    dispatch({ type: 'set-charge-details', payload: { charge } });
    dispatch({ type: 'show-delete' });
  };

  const handleDetails = (charge: Charge) => {
    dispatch({ type: 'set-charge-details', payload: { charge } });
    dispatch({ type: 'show-details', payload: { result: true } });
    navigate(`/pagos/${charge._id}`);
  };
  return (
    <>
      <table className={`w-full text-xs text-center`}>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>ID</th>
            <th className='font-light p-2 bg-gray-100'>Proveedor</th>
            <th className='font-light p-2 bg-gray-100'>Monto Total</th>
            <th className='font-light p-2 bg-gray-100'>Fecha Transacción</th>
            <th className='font-light p-2 bg-gray-100'>Estado</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Producto</th>
            <th className='font-light p-2 bg-gray-100'>Cant.</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Detalles</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {charges?.map(charge => (
            <tr className={`border-b border-b-gray-300 font-bold font-roboto text-gray-600`} key={charge._id}>
              <td className='p-2 text-gray-800'>#{charge._id.slice(-5)}</td>
              <td className='p-2 hover:text-gray-400' title="Ver Proveedor"><Link to={`/proveedores/${charge.supplier._id}`}>{charge.supplier.identity_number}</Link></td>
              <td className='p-2'>{formatCurrencyLocal(charge.total_amount)}</td>
              <td className='p-2'>{formatDate(charge.settlement_date)}</td>
              <td className={`${charge.status === 'paid' ? 'text-green-600' : 'text-red-600'} p-2 uppercase`}>{charge.status === 'paid' ? 'pago' : 'pendiente'}</td>
              <td className='p-2'>{formatCurrencyLocal(charge.pending_amount)}</td>
              <td className='p-2 hover:text-gray-400'>
                <Link to={`/productos/${charge.product.id._id}`} title="Ver Producto">
                  <div className="flex flex-col justify-center items-center">
                    <p>{charge.product.id.name}</p>
                  </div>                
                </Link>
              </td>
              <td className='p-2'>{charge.product.quantity}</td>
              <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                <button
                  type="button"
                  className="w-full text-gray-400 flex justify-center items-center font-bold group"
                  onClick={() => handleDetails(charge)}
                  title="Detalles"
                >
                  <QueueListIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                </button>
              </td>
              <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                <button
                  type="button"
                  className="w-full text-gray-100 flex justify-center items-center font-bold group"
                  onClick={() => handleDelete(charge)}
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