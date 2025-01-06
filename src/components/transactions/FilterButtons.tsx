import { ListActions } from "@/reducers/customerReducer";
import { transactionTypeTranslations } from "@/utils/es";
import { Dispatch } from "react";

type FilterButtonsProps = {
  state: {
    transactionsFilter: string;
  },
  dispatch: Dispatch<ListActions>;
};

export default function FilterButtons({state, dispatch}: FilterButtonsProps) {
  const transactionTypes = Object.keys(transactionTypeTranslations);
  return (
    <div className={`w-full flex flex-row justify-center items-center gap-2 mb-2 transition-all ease-in-out duration-500`}>
      <button
        className={`flex flex-row justify-between items-center gap-1 p-2 bg-green-600 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-green-700 transition-all ease-in-out duration-300 relative`}
        onClick={() => dispatch({ type: 'filter-transactions', payload: { filter: 'todos' } })}
        title="Filtrar Transacciones"
      >
        <div className={`${state?.transactionsFilter !== 'todos' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
        Todas
      </button>

      {transactionTypes && (
        <>
          {transactionTypes.map(type => (
            <button
              className={`flex flex-row justify-between items-center gap-1 p-2 bg-indigo-700 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-800 transition-all ease-in-out duration-300 relative`}
              key={type}
              onClick={() => dispatch({ type: 'filter-transactions', payload: { filter: type } })}
              title="Filtrar Transacciones"
            >
              <div className={`${state?.transactionsFilter !== type ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
              {transactionTypeTranslations[type]}
            </button>
          ))}
        </>
      )}
    </div>
  );
}