import { ListActions } from "@/reducers/customerReducer";
import { Transaction, Transactions } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { transactionTypeTranslations } from "@/utils/es";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";

type TransactionsTableProps = {
  state: {
    searchTransaction: Transactions;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    transactionDetails: Transaction;
  },
  transactions: Transactions;
  dispatch: Dispatch<ListActions>;
};

export default function TransactionsTable({state, transactions, dispatch}: TransactionsTableProps) {
  const handleEdit = (transaction: Transaction) => {
    dispatch({ type: 'set-transaction-details', payload: { transaction } });
    dispatch({ type: 'show-edit' });
  };
  return (
    <>
      <table className={`w-full text-xs text-center`}>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Tipo</th>
            <th className='font-light p-2 bg-gray-100'>Monto Total</th>
            <th className='font-light p-2 bg-gray-100'>Monto Bs.</th>
            <th className='font-light p-2 bg-gray-100'>Monto $</th>
            <th className='font-light p-2 bg-gray-100'>Monto TDC/TDD</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Tasa de Cambio</th>
            <th className='font-light p-2 bg-gray-100'>Receptor</th>
            <th className='font-light p-2 bg-gray-100'>ID del Cobro</th>
            <th className='font-light p-2 bg-gray-100'>ID del Pago</th>
            <th className='font-light p-2 bg-gray-100'>Fecha Transacción</th>
            <th className={`${state.viewEditCustomer || state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Editar</th>
          </tr>
        </thead>

        <tbody>
          {transactions?.map(transaction => (
            <tr className={`border-b border-b-gray-300 font-bold font-roboto text-gray-600`} key={transaction._id}>
              <td className='p-2 text-gray-800'>{transactionTypeTranslations[transaction.type]}</td>
              <td className='p-2'>{formatCurrencyLocal(transaction.total_amount)}</td>
              <td className='p-2'>{formatCurrencyLocal(transaction.amount_one)}</td>
              <td className='p-2'>{formatCurrency(transaction.amount_two)}</td>
              <td className='p-2'>{formatCurrencyLocal(transaction.amount_three)}</td>
              <td className='p-2'>{formatCurrencyLocal(transaction.pending_amount)}</td>
              <td className='p-2'>{formatCurrencyLocal(transaction.currency_rate)}</td>
              <td className='p-2'>{transaction.receiver}</td>
              <td className='p-2'>#{transaction.payment !== null ? transaction.payment._id.slice(-5): 'N/A'}</td>
              <td className='p-2'>#{transaction.charge !== null ? transaction.charge._id.slice(-5) : 'N/A'}</td>
              <td className='p-2'>{formatDate(transaction.date)}</td>
              <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer || state.viewEditCustomer ? 'hidden' : ''} p-2`}>
                <button
                  type="button"
                  className={`w-full text-gray-400 flex justify-center items-center font-bold group`}
                  onClick={() => handleEdit(transaction)}
                  title="Editar"
                >
                  <PencilSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}