import { Customers } from "@/types/types";

type CustomersReportTableProps = {
  customers: Customers;
};

export default function CustomersReportTable({ customers }: CustomersReportTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Número de Cédula</th>
            <th className='font-light p-2 bg-gray-100'>Nombres</th>
            <th className='font-light p-2 bg-gray-100'>Apellidos</th>
            <th className='font-light p-2 bg-gray-100'>Teléfono</th>
            <th className='font-light p-2 bg-gray-100'>Email</th>
          </tr>
        </thead>

        <tbody>
          {customers.length !== 0 ? (
            <>
              {customers.map(customer => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={customer._id}>
                  <td className='p-2'>{customer.identity_number}</td>
                  <td className='p-2'>{customer.name}</td>
                  <td className='p-2'>{customer.last_name}</td>
                  <td className='p-2'>{customer.telephone}</td>
                  <td className='p-2'>{customer.email}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}