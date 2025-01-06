import { ListActions } from "@/reducers/customerReducer";
import { Service, Services } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { contactResultsTranslation } from "@/utils/es";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link } from "react-router-dom";

type ServicesOfMonthTableProps = {
  state: {
    searchService: Services;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    serviceDetails: Service;
  },
  services: Services;
  dispatch: Dispatch<ListActions>;
};

export default function ServicesOfMonthTable({state, services, dispatch}: ServicesOfMonthTableProps) {
  const handleDelete = (service: Service) => {
    dispatch({ type: 'set-service-details', payload: { service } });
    dispatch({ type: 'show-delete' });
  };

  const handleEdit = (service: Service) => {
    dispatch({ type: 'set-service-details', payload: { service } });
    dispatch({ type: 'show-edit' });
  };
  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>ID</th>
            <th className='font-light p-2 bg-gray-100'>Cliente</th>
            <th className='font-light p-2 bg-gray-100'>Vehículo</th>
            <th className='font-light p-2 bg-gray-100'>Tipo de Aceite</th>
            <th className='font-light p-2 bg-gray-100'>Marca Aceite</th>
            <th className='font-light p-2 bg-gray-100'>Filtro</th>
            <th className='font-light p-2 bg-gray-100'>Kilometraje</th>
            <th className='font-light p-2 bg-gray-100'>Fecha del Servicio</th>
            <th className='font-light p-2 bg-gray-100'>Recordatorio</th>
            <th className={`${state.viewEditCustomer || state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Editar</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {services.length !== 0 ? (
            <>
              {services.map(service => (
                <tr className={`${service._id === state.serviceDetails._id && state.viewEditCustomer ? 'text-red-600' : 'text-gray-600'} border-b border-b-gray-300 font-bold`} key={service._id}>
                  <td className='p-2'>#{service.payment._id.slice(-5)}</td>
                  <td className='p-2'>
                    <Link to={`/clientes/${service.customer._id}`} title="Ver detalles de la Transacción" className="hover:text-gray-400">
                      <div className="flex flex-col justify-center items-center">
                        <p>{service.customer.name} {service.customer.last_name}</p>
                      </div>
                    </Link>
                  </td>
                  <td className='p-2'>{service.vehicle}</td>
                  <td className='p-2'>{service.type_oil}</td>
                  <td className='p-2'>{service.brand_oil}</td>
                  <td className='p-2'>{service.filter}</td>
                  <td className='p-2'>{service.mileage}</td>
                  <td className='p-2'>{formatDate(service.service_date)}</td>
                  <td className='p-2'>{contactResultsTranslation[service.contact.result]}</td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer || state.viewEditCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className={`w-full text-gray-400 flex justify-center items-center font-bold group`}
                      onClick={() => handleEdit(service)}
                      title="Editar"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-100 flex justify-center items-center font-bold group"
                      onClick={() => handleDelete(service)}
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