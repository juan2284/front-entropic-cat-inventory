import { ListActions } from "@/reducers/customerReducer";
import { AddPaymentFormType, Payment } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import AddPaymentAmortizationForm from "./AddPaymentAmortizationForm";
import { amortizePayment } from "@/api/PaymentsAPI";

type PaymentAmortizationFormProps = {
  payment: Payment;
  dispatch: Dispatch<ListActions>;
};

export default function PaymentAmortizationForm({payment, dispatch}: PaymentAmortizationFormProps) {
  const { register, handleSubmit, reset, formState: { errors }, getValues, setValue } = useForm<AddPaymentFormType>();
  const [pending, setPending] = useState(0);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: amortizePayment,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['payment', payment._id] });
      queryClient.invalidateQueries({ queryKey: ['transactionsByPayment', payment._id] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: AddPaymentFormType) => {
    const paymentUpdate = {
      id: payment._id,
      payment: data
    };

    mutate(paymentUpdate);
    reset();
    dispatch({ type: 'show-edit' });
  };

  useEffect(() => {
    setValue('pending_amount', payment.pending_amount);
  }, [payment]);
  return (
    <>
      <form
        className="w-full p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >

        <div className="w-full text-center flex flex-row justify-between items-center gap-2">
          <AddPaymentAmortizationForm payment={payment} register={register} errors={errors} setPending={setPending} getValues={getValues} setValue={setValue} />
        </div>

        <div className="flex flex-row justify-center items-center font-roboto p-2 mt-2">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Monto Pendiente:</h4>
          <h5 className="w-full text-sm text-center font-bold text-red-600">{formatCurrencyLocal(pending)}</h5>
        </div>

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Abonar</button>

          <button
            type="button"
            className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => dispatch({ type: 'show-edit' })}
          >Close</button>
        </div>
      </form>
    </>
  );
}