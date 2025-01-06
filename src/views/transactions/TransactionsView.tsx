import Loader from "@/components/globals/Loader";
import Logo from "@/components/globals/Logo";
import EditTransaction from "@/components/transactions/EditTransaction";
import FilterButtons from "@/components/transactions/FilterButtons";
import SearchTransaction from "@/components/transactions/SearchTransaction";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { useTransactions } from "@/hooks/transactionsHooks/useTransactions";
import { ListActions } from "@/reducers/customerReducer";
import { Transaction, Transactions } from "@/types/types";
import { Dispatch } from "react";

type TransactionsViewProps = {
  state: {
    show: boolean;
    viewAddCustomer: boolean;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    transactions: Transactions;
    transactionDetails: Transaction;
    searchTransaction: Transactions;
    transactionsFilter: string;
  },
  dispatch: Dispatch<ListActions>;
};

export default function TransactionsView({state, dispatch}: TransactionsViewProps) {
  const { data, isLoading, isError } = useTransactions();
  const transactions: Transactions = state?.transactions.length !== 0 ? state?.transactions : data;
  const transactionsToView: Transactions = state.transactionsFilter === 'todos' ? transactions : transactions.filter(transaction => transaction.type === state.transactionsFilter);

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Transacciones Registradas</h4>
    </div>
  );
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <header>
        <SearchTransaction dispatch={dispatch} transactions={data!} />
      </header>

      <main className="p-4">
        {state?.searchTransaction && state.searchTransaction.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <TransactionsTable state={state} transactions={state.searchTransaction} dispatch={dispatch} />
            </article>
          </section>
        )}

        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Editar Transacción:</h4>
              <EditTransaction state={state} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Todas las Transacciones</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <FilterButtons state={state} dispatch={dispatch} />
              </div>
            </div>

            <TransactionsTable state={state} transactions={transactionsToView} dispatch={dispatch} />
          </article>
        </section>
      </main>
    </>
  );
}