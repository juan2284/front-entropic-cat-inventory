import { Payments } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";

type PaymentsReportTableProps = {
  payments: Payments;
};

export default function PaymentsReportTable({payments}: PaymentsReportTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Cliente</th>
            <th className='font-light p-2 bg-gray-100'>Monto Total</th>
            <th className='font-light p-2 bg-gray-100'>Monto Bs</th>
            <th className='font-light p-2 bg-gray-100'>Monto $</th>
            <th className='font-light p-2 bg-gray-100'>Monto TDD/TDC</th>
            <th className='font-light p-2 bg-gray-100'>Tasa de Cambio</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Estatus del Pago</th>
            <th className='font-light p-2 bg-gray-100'>Productos</th>
            <th className='font-light p-2 bg-gray-100'>Fecha de Compra</th>
          </tr>
        </thead>

        <tbody>
          {payments.length !== 0 ? (
            <>
              {payments.map(payment => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={payment._id}>
                  <td className='p-2'>{payment.customer.name} {payment.customer.last_name}</td>
                  <td className='p-2'>{formatCurrencyLocal(payment.total_amount)}</td>
                  <td className='p-2'>{formatCurrencyLocal(payment.amount_one)}</td>
                  <td className='p-2'>{formatCurrency(payment.amount_two)}</td>
                  <td className='p-2'>{formatCurrencyLocal(payment.amount_three)}</td>
                  <td className='p-2'>{formatCurrency(payment.currency_rate)}</td>
                  <td className='p-2'>{formatCurrencyLocal(payment.pending_amount)}</td>
                  <td className='p-2'>{paidStatusTranslations[payment.status]}</td>
                  <td className='p-2'>{payment.products.reduce((collector, product) => collector + product.quantity, 0)}</td>
                  <td className='p-2'>{formatDate(payment.settlement_date)}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}