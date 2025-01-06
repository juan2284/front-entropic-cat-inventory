import { Payment } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";

type PaymentDetailsTableProps = {
  payment: Payment;
};

export default function PaymentDetailsTable({payment}: PaymentDetailsTableProps) {
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
          </tr>
        </thead>

        <tbody>
            <tr className={`border-b border-b-gray-300 font-bold font-roboto text-gray-600`} key={payment._id}>
              <td className='p-2'>{formatCurrencyLocal(payment.total_amount)}</td>
              <td className='p-2'>{formatCurrencyLocal(payment.amount_one)}</td>
              <td className='p-2'>{formatCurrency(payment.amount_two)}</td>
              <td className='p-2'>{formatCurrencyLocal(payment.amount_three)}</td>
              <td className='p-2'>{formatDate(payment.settlement_date)}</td>
              <td className={`${payment.status === 'paid' ? 'text-green-600' : 'text-red-600'} p-2 uppercase`}>{payment.status === 'paid' ? 'pago' : 'pendiente'}</td>
              <td className='p-2'>{formatCurrencyLocal(payment.pending_amount)}</td>
            </tr>
        </tbody>
      </table>
    </>
  );
}