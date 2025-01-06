import { Service, Services } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { contactResultsTranslation } from "@/utils/es";
import { Link } from "react-router-dom";

type ServiceDetailsTableProps = {
  state: {
    searchService: Services;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    serviceDetails: Service;
  },
  services: Services;
};

export default function ServiceDetailsTable({state, services}: ServiceDetailsTableProps) {
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
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}