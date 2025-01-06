import { Services } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { contactResultsTranslation } from "@/utils/es";

type ServicesReportTableProps = {
  services: Services;
};

export default function ServicesReportTable({services}: ServicesReportTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Cliente</th>
            <th className='font-light p-2 bg-gray-100'>Vehículo</th>
            <th className='font-light p-2 bg-gray-100'>Tipo de Aceite</th>
            <th className='font-light p-2 bg-gray-100'>Marca de Aceite</th>
            <th className='font-light p-2 bg-gray-100'>Filtro</th>
            <th className='font-light p-2 bg-gray-100'>Kilometraje</th>
            <th className='font-light p-2 bg-gray-100'>Fecha Servicio</th>
            <th className='font-light p-2 bg-gray-100'>Contacto</th>
          </tr>
        </thead>

        <tbody>
          {services.length !== 0 ? (
            <>
              {services.map(service => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={service._id}>
                  <td className='p-2'>{service.customer.name} {service.customer.last_name}</td>
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