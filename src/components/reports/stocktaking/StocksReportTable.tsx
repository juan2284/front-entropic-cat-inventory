import { Stocktakings } from "@/types/types";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrencyLocal } from "@/utils/formatCurrency";

type StocksReportTableProps = {
  stocks: Stocktakings;
};

export default function StocksReportTable({stocks}: StocksReportTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Producto</th>
            <th className='font-light p-2 bg-gray-100'>Proveedor</th>
            <th className='font-light p-2 bg-gray-100'>Cant. Productos</th>
            <th className='font-light p-2 bg-gray-100'>Monto Compra</th>
            <th className='font-light p-2 bg-gray-100'>Estatus Pago</th>
            <th className='font-light p-2 bg-gray-100'>Ventas</th>
            <th className='font-light p-2 bg-gray-100'>Existencia</th>
            <th className='font-light p-2 bg-gray-100'>Estatus Inventario</th>
          </tr>
        </thead>

        <tbody>
          {stocks.length !== 0 ? (
            <>
              {stocks.map(stock => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={stock._id}>
                  <td className='p-2'>{stock.product.name}</td>
                  <td className='p-2'>{stock.supplier.name} {stock.supplier.last_name}</td>
                  <td className='p-2'>{stock.quantity}</td>
                  <td className='p-2'>{formatCurrencyLocal(stock.charge.total_amount)}</td>
                  <td className='p-2'>{paidStatusTranslations[stock.charge.status]}</td>
                  <td className='p-2'>{stock.transactions.reduce((collector, product) => collector + product.quantity, 0)}</td>
                  <td className='p-2'>{stock.remaining}</td>
                  <td className='p-2'>{stock.stock_out ? 'Activo' : 'Inactivo'}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}