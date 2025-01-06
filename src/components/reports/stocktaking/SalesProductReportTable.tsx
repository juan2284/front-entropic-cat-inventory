import { SalesXProduct } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";

type SalesProductReportTableProps = {
  sales: SalesXProduct;
};

export default function SalesProductReportTable({sales}: SalesProductReportTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Código</th>
            <th className='font-light p-2 bg-gray-100'>Producto</th>
            <th className='font-light p-2 bg-gray-100'>Fecha</th>
            <th className='font-light p-2 bg-gray-100'>Cant. Productos</th>
          </tr>
        </thead>

        <tbody>
          {sales.length !== 0 ? (
            <>
              {sales.map(sale => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={sale.id}>
                  <td className='p-2'>{sale.code}</td>
                  <td className='p-2'>{sale.product}</td>
                  <td className='p-2'>{formatDate(sale.saleDate)}</td>
                  <td className='p-2'>{sale.quantity}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}