import { useStocksByProduct } from "@/hooks/productsHooks/useStocksByProduct";
import { Product } from "@/types/types";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrencyLocal } from "@/utils/formatCurrency";

type StocksDetailsAddProps = {
  product: Product['_id'];
};

export default function StocksDetailsAdd({product}: StocksDetailsAddProps) {
  const { stocksToView } = useStocksByProduct(product!);
  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Producto</th>
            <th className='font-light p-2 bg-gray-100'>Código</th>
            <th className='font-light p-2 bg-gray-100'>Proveedor</th>
            <th className='font-light p-2 bg-gray-100'>Cantidad</th>
            <th className='font-light p-2 bg-gray-100'>Monto de Compra</th>
            <th className='font-light p-2 bg-gray-100'>Estatus de Compra</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Ventas</th>
            <th className='font-light p-2 bg-gray-100'>Existencia</th>
          </tr>
        </thead>

        <tbody>
          {stocksToView?.length !== 0 ? (
            <>
              {stocksToView?.map(stock => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={stock._id}>
                  <td className='p-2'>{stock.product.name}</td>
                  <td className='p-2'>{stock.product.code}</td>
                  <td className='p-2'>{stock.supplier.name}</td>
                  <td className='p-2'>{stock.quantity}</td>
                  <td className='p-2'>{formatCurrencyLocal(stock.charge.total_amount)}</td>
                  <td className={`${stock.charge.status === 'paid' ? 'text-green-600' : 'text-red-600'} p-2`}>{paidStatusTranslations[stock.charge.status]}</td>
                  <td className='p-2'>{formatCurrencyLocal(stock.charge.pending_amount)}</td>
                  <td className='p-2'>{stock.quantity - stock.remaining}</td>
                  <td className={`${(stock.remaining / stock.quantity) * 100 <= 15 ? 'text-red-600' : (stock.remaining / stock.quantity) * 100 >= 15 && (stock.remaining / stock.quantity) * 100 <= 50 ? 'text-amber-500' : 'text-teal-600'} p-2`}>{stock.remaining}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}