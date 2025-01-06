import { Suppliers } from "@/types/types";

type SuppliersReportTableProps = {
  suppliers: Suppliers;
};

export default function SuppliersReportTable({ suppliers }: SuppliersReportTableProps) {
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
          {suppliers.length !== 0 ? (
            <>
              {suppliers.map(supplier => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={supplier._id}>
                  <td className='p-2'>{supplier.identity_number}</td>
                  <td className='p-2'>{supplier.name}</td>
                  <td className='p-2'>{supplier.last_name}</td>
                  <td className='p-2'>{supplier.telephone}</td>
                  <td className='p-2'>{supplier.email}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}