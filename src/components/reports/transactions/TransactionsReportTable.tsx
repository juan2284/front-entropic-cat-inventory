import { Transactions } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { paidStatusTranslations, transactionTypeTranslations } from "@/utils/es";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";

type TransactionsReportTableProps = {
  transactions: Transactions;
};

export default function TransactionsReportTable({transactions}: TransactionsReportTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Transacción</th>
            <th className='font-light p-2 bg-gray-100'>Tipo Transacción</th>
            <th className='font-light p-2 bg-gray-100'>Monto Total</th>
            <th className='font-light p-2 bg-gray-100'>Monto Bs</th>
            <th className='font-light p-2 bg-gray-100'>Monto $</th>
            <th className='font-light p-2 bg-gray-100'>Monto TDD/TDC</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Tasa de Cambio</th>
            <th className='font-light p-2 bg-gray-100'>Vendedor</th>
            <th className='font-light p-2 bg-gray-100'>Estatus del Cobro</th>
            <th className='font-light p-2 bg-gray-100'>Estatus del Pago</th>
            <th className='font-light p-2 bg-gray-100'>Fecha Transacción</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length !== 0 ? (
            <>
              {transactions.map(transaction => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={transaction._id}>
                  <td className='p-2'>{transaction.payment?._id ? 'payment' : transaction.charge?._id ? 'charge' : 'N/A'}</td>
                  <td className='p-2'>{transactionTypeTranslations[transaction.type]}</td>
                  <td className='p-2'>{formatCurrencyLocal(transaction.total_amount)}</td>
                  <td className='p-2'>{formatCurrencyLocal(transaction.amount_one)}</td>
                  <td className='p-2'>{formatCurrency(transaction.amount_two)}</td>
                  <td className='p-2'>{formatCurrencyLocal(transaction.amount_three)}</td>
                  <td className='p-2'>{formatCurrencyLocal(transaction.pending_amount)}</td>
                  <td className='p-2'>{formatCurrencyLocal(transaction.currency_rate)}</td>
                  <td className='p-2'>{transaction.receiver}</td>
                  <td className='p-2'>{transaction.payment?._id ? `${paidStatusTranslations[transaction.payment.status]}` : 'N/A'}</td>
                  <td className='p-2'>{transaction.charge?._id ? `${paidStatusTranslations[transaction.charge.status]}` : 'N/A'}</td>
                  <td className='p-2'>{formatDate(transaction.date)}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}