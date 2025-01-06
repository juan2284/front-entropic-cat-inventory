import { ListActions } from "@/reducers/customerReducer";
import { Supplier, Suppliers } from "@/types/types";
import { PencilSquareIcon, QueueListIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { useNavigate } from "react-router-dom";

type SuppliersTableProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    supplierDetails: Supplier;
  };
  suppliers: Suppliers;
  dispatch: Dispatch<ListActions>;
};

export default function SuppliersTable({state, suppliers, dispatch}: SuppliersTableProps) {
  const navigate = useNavigate();

  const handleDelete = (supplier: Supplier) => {
    dispatch({ type: 'set-supplier-details', payload: { supplier } });
    dispatch({ type: 'show-delete' });
  };

  const handleEdit = (supplier: Supplier) => {
    dispatch({ type: 'set-supplier-details', payload: { supplier } });
    dispatch({ type: 'show-edit' });
  };

  const handleDetails = (supplier: Supplier) => {
    dispatch({ type: 'set-supplier-details', payload: { supplier } });
    dispatch({ type: 'show-details', payload: { result: true } });
    navigate(`/proveedores/${supplier._id}`);
  };
  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>RIF</th>
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
          {suppliers.length !== 0 ? (
            <>
              {suppliers.map(supplier => (
                <tr className={`${supplier._id === state.supplierDetails._id && state.viewEditCustomer ? 'text-red-600' : 'text-gray-600'} border-b border-b-gray-300 font-bold`} key={supplier._id}>
                  <td className='p-2'>{supplier.identity_number}</td>
                  <td className='p-2'>{supplier.name}</td>
                  <td className='p-2'>{supplier.last_name}</td>
                  <td className='p-2'>{supplier.telephone}</td>
                  <td className='p-2'>{supplier.email}</td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-400 flex justify-center items-center font-bold group"
                      onClick={() => handleDetails(supplier)}
                      title="Detalles"
                    >
                      <QueueListIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer || state.viewEditCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className={`w-full text-gray-400 flex justify-center items-center font-bold group`}
                      onClick={() => handleEdit(supplier)}
                      title="Editar"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-100 flex justify-center items-center font-bold group"
                      onClick={() => handleDelete(supplier)}
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