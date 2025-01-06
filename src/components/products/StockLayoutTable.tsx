import { Stocktakings } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { paidStatusTranslations } from "@/utils/es";

type StockLayoutTableProps ={
  stocks: Stocktakings | undefined;
};

export default function StockLayoutTable({stocks}: StockLayoutTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Producto</th>
            <th className='font-light p-2 bg-gray-100'>Proveedor</th>
            <th className='font-light p-2 bg-gray-100'>Cant.</th>
            <th className='font-light p-2 bg-gray-100'>Fecha</th>
            <th className='font-light p-2 bg-gray-100'>Pago</th>
            <th className='font-light p-2 bg-gray-100'>Existencia</th>
            <th className='font-light p-2 bg-gray-100'>Ventas</th>
            <th className='font-light p-2 bg-gray-100'>Estatus</th>
          </tr>
        </thead>

        <tbody>
          {stocks?.map(stock => (
            <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={stock._id}>
              <td className='p-2'>{stock.product.name}</td>
              <td className='p-2'>{stock.supplier.name} {stock.supplier.last_name}</td>
              <td className='p-2'>{stock.quantity}</td>
              <td className='p-2'>{formatDate(stock.charge.settlement_date)}</td>
              <td className='p-2'>{paidStatusTranslations[stock.charge.status]}</td>
              <td className={`${(stock.remaining / stock.quantity) * 100 <= 15 ? 'text-red-600' : (stock.remaining / stock.quantity) * 100 >= 15 && (stock.remaining / stock.quantity) * 100 <= 50 ? 'text-amber-500' : 'text-teal-600'} p-2`}>{stock.remaining}</td>
              <td className='p-2'>{stock.quantity - stock.remaining}</td>
              <td className={`${stock.stock_out === true ? 'text-green-600' : 'text-red-600'} p-2`}>{stock.stock_out === true ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}