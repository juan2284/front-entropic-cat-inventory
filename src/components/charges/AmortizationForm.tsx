import { ListActions } from "@/reducers/customerReducer";
import { AddChargeFormType, Charge } from "@/types/types";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddAmortizationForm from "@/components/charges/AddAmortizationForm";
import { amortizeCharge } from "@/api/ChargesAPI";

type AmortizationFormProps = {
  charge: Charge;
  dispatch: Dispatch<ListActions>;
};

export default function AmortizationForm({charge, dispatch}: AmortizationFormProps) {
  const { register, handleSubmit, reset, formState: { errors }, getValues, setValue } = useForm<AddChargeFormType>();
  const [pending, setPending] = useState(0);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: amortizeCharge,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['charge', charge._id] });
      queryClient.invalidateQueries({ queryKey: ['transactionsByCharge', charge._id] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: AddChargeFormType) => {
    const chargeUpdate = {
      id: charge._id,
      charge: data
    };

    mutate(chargeUpdate);
    reset();
    dispatch({ type: 'show-edit' });
  };

  useEffect(() => {
    setValue('pending_amount', charge.pending_amount);
  }, [charge]);
  return (
    <>
      <form
        className="w-full p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >

        <div className="w-full text-center flex flex-row justify-between items-center gap-2">
          <AddAmortizationForm charge={charge} register={register} errors={errors} setPending={setPending} getValues={getValues} setValue={setValue} />
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