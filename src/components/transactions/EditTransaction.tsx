import { ListActions } from "@/reducers/customerReducer";
import { Transaction, TransactionEditForm, Transactions } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EditTransactionForm from "./EditTransactionForm";
import { editTransaction } from "@/api/TransactionsAPI";
import TransactionsTable from "./TransactionsTable";

type EditTransactionProps = {
  state: {
    searchTransaction: Transactions;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    transactionDetails: Transaction;
  };
  dispatch: Dispatch<ListActions>;
};

export default function EditTransaction({state, dispatch}: EditTransactionProps) {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<TransactionEditForm>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editTransaction,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: TransactionEditForm) => {
    const transactionUpdate = {
      id: state.transactionDetails._id,
      transaction: data
    };

    mutate(transactionUpdate);
    reset();
    dispatch({ type: 'show-edit' });
  };

  useEffect(() => {
    setValue('total_amount', state.transactionDetails.total_amount);
    setValue('amount_one', state.transactionDetails.amount_one);
    setValue('amount_two', state.transactionDetails.amount_two);
    setValue('amount_three', state.transactionDetails.amount_three);
    setValue('currency_rate', state.transactionDetails.currency_rate);
  }, [state.transactionDetails]);
  return (
    <>
      <TransactionsTable state={state} transactions={[state.transactionDetails]} dispatch={dispatch} />

      <form
        className="w-2/3 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <EditTransactionForm register={register} errors={errors} />
        </div>

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Guardar Cambios</button>

          <button
            type="button"
            className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => dispatch({ type: 'show-edit' })}
          >Cancelar</button>
        </div>
      </form>
    </>
  );
}