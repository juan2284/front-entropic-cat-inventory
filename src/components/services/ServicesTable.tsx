import { Services } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";

type ServicesTableProps = {
  services: Services;
};

export default function ServicesTable({services}: ServicesTableProps) {
  return (
    <>
      <table className={`w-full text-xs text-center`}>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Vehículo</th>
            <th className='font-light p-2 bg-gray-100'>Aceite</th>
            <th className='font-light p-2 bg-gray-100'>Marca Aceite</th>
            <th className='font-light p-2 bg-gray-100'>Filtro</th>
            <th className='font-light p-2 bg-gray-100'>Kilometraje</th>
            <th className='font-light p-2 bg-gray-100'>Fecha del Servicio</th>
            <th className='font-light p-2 bg-gray-100'>Recordatorio</th>
          </tr>
        </thead>

        <tbody>
          {services?.map(service => (
            <tr className={`border-b border-b-gray-300 font-bold font-roboto text-gray-600`} key={service._id}>
              <td className='p-2'>{service.vehicle}</td>
              <td className='p-2'>{service.type_oil}</td>
              <td className='p-2'>{service.brand_oil}</td>
              <td className='p-2'>{service.filter}</td>
              <td className='p-2'>{service.mileage}</td>
              <td className='p-2'>{formatDate(service.service_date)}</td>
              <td className={`${service.contact.result === 'contacted' ? 'text-green-600' : 'text-red-600'} p-2 uppercase`}>{service.contact.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}