import { Charges } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";

type ChargesReportTableProps = {
  charges: Charges;
};

export default function ChargesReportTable({charges}: ChargesReportTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Proveedor</th>
            <th className='font-light p-2 bg-gray-100'>Monto Total</th>
            <th className='font-light p-2 bg-gray-100'>Monto Bs</th>
            <th className='font-light p-2 bg-gray-100'>Monto $</th>
            <th className='font-light p-2 bg-gray-100'>Monto TDD/TDC</th>
            <th className='font-light p-2 bg-gray-100'>Tasa de Cambio</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Estatus del Pago</th>
            <th className='font-light p-2 bg-gray-100'>Producto</th>
            <th className='font-light p-2 bg-gray-100'>Cant. Productos</th>
            <th className='font-light p-2 bg-gray-100'>Fecha de Compra</th>
          </tr>
        </thead>

        <tbody>
          {charges.length !== 0 ? (
            <>
              {charges.map(charge => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={charge._id}>
                  <td className='p-2'>{charge.supplier.name} {charge.supplier.last_name}</td>
                  <td className='p-2'>{formatCurrencyLocal(charge.total_amount)}</td>
                  <td className='p-2'>{formatCurrencyLocal(charge.amount_one)}</td>
                  <td className='p-2'>{formatCurrency(charge.amount_two)}</td>
                  <td className='p-2'>{formatCurrencyLocal(charge.amount_three)}</td>
                  <td className='p-2'>{formatCurrency(charge.currency_rate)}</td>
                  <td className='p-2'>{formatCurrencyLocal(charge.pending_amount)}</td>
                  <td className='p-2'>{paidStatusTranslations[charge.status]}</td>
                  <td className='p-2'>{charge.product.id.name}</td>
                  <td className='p-2'>{charge.product.quantity}</td>
                  <td className='p-2'>{formatDate(charge.settlement_date)}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}