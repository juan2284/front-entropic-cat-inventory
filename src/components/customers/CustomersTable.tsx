import { ListActions } from "@/reducers/customerReducer";
import { Customer } from "@/types/types";
import { PencilSquareIcon, QueueListIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { useNavigate } from "react-router-dom";

type CustomersTableProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    customerDetails: Customer;
  };
  customers: Customer[];
  dispatch: Dispatch<ListActions>;
};

export default function CustomersTable({state, customers, dispatch}: CustomersTableProps) {
  const navigate = useNavigate();

  const handleDelete = (customer: Customer) => {
    dispatch({type: 'set-customer-details', payload: {customer}});
    dispatch({type: 'show-delete'});
  };

  const handleEdit = (customer: Customer) => {
    dispatch({type: 'set-customer-details', payload: {customer}});
    dispatch({type: 'show-edit'});
  };

  const handleDetails = (customer: Customer) => {
    dispatch({type: 'set-customer-details', payload: {customer}});
    dispatch({type: 'show-details', payload: {result: true}});
    navigate(`/clientes/${customer._id}`);
  };

  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Número de Cédula</th>
            <th className='font-light p-2 bg-gray-100'>Nombres</th>
            <th className='font-light p-2 bg-gray-100'>Apellidos</th>
            <th className='font-light p-2 bg-gray-100'>Teléfono</th>
            <th className='font-light p-2 bg-gray-100'>Email</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Detalles</th>
            <th className={`${state.viewEditCustomer || state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Editar</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {customers.length !== 0 ? (
            <>
              {customers.map( customer => (              
                <tr className={`${customer._id === state.customerDetails._id && state.viewEditCustomer ? 'text-red-600' : 'text-gray-600'} border-b border-b-gray-300 font-bold`} key={customer._id}>
                  <td className='p-2'>{customer.identity_number}</td>
                  <td className='p-2'>{customer.name}</td>
                  <td className='p-2'>{customer.last_name}</td>
                  <td className='p-2'>{customer.telephone}</td>
                  <td className='p-2'>{customer.email}</td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-400 flex justify-center items-center font-bold group"
                      onClick={() => handleDetails(customer)}
                      title="Detalles"
                    >
                      <QueueListIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer || state.viewEditCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className={`w-full text-gray-400 flex justify-center items-center font-bold group`}
                      onClick={() => handleEdit(customer)}
                      title="Editar"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-100 flex justify-center items-center font-bold group"
                      onClick={() => handleDelete(customer)}
                      title="Eliminar"
                    >
                      <XCircleIcon className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}