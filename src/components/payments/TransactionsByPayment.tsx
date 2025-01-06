import { useTransactionsByPayment } from "@/hooks/transactionsHooks/usetransactionsByPayment";
import { Payment, Transaction } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { transactionTypeTranslations } from "@/utils/es";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";
import Loader from "../globals/Loader";

type TransactionsByPaymentProps = {
  paymentId: Payment['_id'];
};

export default function TransactionsByPayment({paymentId}: TransactionsByPaymentProps) {
  const { data, isLoading, isError } = useTransactionsByPayment(paymentId);
  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      {data.length !== 0 ? (
        <table className={`w-full text-xs text-center`}>
          <thead>
            <tr className='text-xs font-roboto text-gray-500'>
              <th className='font-light p-2 bg-gray-100'>Acción</th>
              <th className='font-light p-2 bg-gray-100'>Monto Total</th>
              <th className='font-light p-2 bg-gray-100'>Monto Bs.</th>
              <th className='font-light p-2 bg-gray-100'>Monto $</th>
              <th className='font-light p-2 bg-gray-100'>Monto TDD</th>
              <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
              <th className='font-light p-2 bg-gray-100'>Tasa de Cambio</th>
              <th className='font-light p-2 bg-gray-100'>Receptor</th>
              <th className='font-light p-2 bg-gray-100'>Fecha Transacción</th>
            </tr>
          </thead>

          <tbody>
            {data.map((transaction: Transaction) => (
              <tr className={`border-b border-b-gray-300 font-bold font-roboto text-gray-600`} key={transaction._id}>
                <td className='p-2'>{transactionTypeTranslations[transaction.type]}</td>
                <td className='p-2'>{formatCurrencyLocal(transaction.total_amount)}</td>
                <td className='p-2'>{formatCurrencyLocal(transaction.amount_one)}</td>
                <td className='p-2'>{formatCurrency(transaction.amount_two)}</td>
                <td className='p-2'>{formatCurrencyLocal(transaction.amount_three)}</td>
                <td className='p-2'>{formatCurrencyLocal(transaction.pending_amount)}</td>
                <td className='p-2'>{formatCurrencyLocal(transaction.currency_rate)}</td>
                <td className='p-2'>{transaction.receiver}</td>
                <td className='p-2'>{formatDate(transaction.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <h4 className="text-center text-gray-600 text-md font-roboto font-light">No hay Transacciones registradas para este Pago.</h4>
        </>
      )}
    </>
  );
}