import { Charges } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { formatCurrencyLocal } from "@/utils/formatCurrency";

type ChargesTableProps = {
  charges: Charges;
};

export default function ChargesTable({charges}: ChargesTableProps) {
  return (
    <>
      <table className={`w-full text-xs text-center`}>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Monto Total</th>
            <th className='font-light p-2 bg-gray-100'>Monto Bs.</th>
            <th className='font-light p-2 bg-gray-100'>Monto $</th>
            <th className='font-light p-2 bg-gray-100'>Monto TDD</th>
            <th className='font-light p-2 bg-gray-100'>Fecha Transacción</th>
            <th className='font-light p-2 bg-gray-100'>Estado</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Productos</th>
          </tr>
        </thead>

        <tbody>
          {charges?.map(charge => (
            <tr className={`border-b border-b-gray-300 font-bold font-roboto text-gray-600`} key={charge._id}>
              <td className='p-2'>{formatCurrencyLocal(charge.total_amount)}</td>
              <td className='p-2'>{formatCurrencyLocal(charge.amount_one)}</td>
              <td className='p-2'>{formatCurrencyLocal(charge.amount_two)}</td>
              <td className='p-2'>{formatCurrencyLocal(charge.amount_three)}</td>
              <td className='p-2'>{formatDate(charge.settlement_date)}</td>
              <td className={`${charge.status === 'paid' ? 'text-green-600' : 'text-red-600'} p-2 uppercase`}>{charge.status === 'paid' ? 'pago' : 'pendiente'}</td>
              <td className='p-2'>{formatCurrencyLocal(charge.pending_amount)}</td>
              <td className='p-2'>
                <div className="flex flex-col justify-center items-center">
                  <p>{charge.product.id.name} - {charge.product.quantity}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}