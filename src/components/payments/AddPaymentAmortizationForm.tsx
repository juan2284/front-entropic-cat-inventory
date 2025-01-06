import { AddPaymentFormType, Payment } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import ErrorMessage from "@/components/globals/ErrorMessage";
import { BanknotesIcon } from "@heroicons/react/20/solid";

type AddPaymentAmortizationFormProps ={
  register: UseFormRegister<AddPaymentFormType>;
  errors: FieldErrors<AddPaymentFormType>;
  getValues: UseFormGetValues<AddPaymentFormType>;
  setValue: UseFormSetValue<AddPaymentFormType>;
  setPending: Dispatch<SetStateAction<number>>;
  payment: Payment;
};

export default function AddPaymentAmortizationForm({register, errors, getValues, setValue, setPending, payment}: AddPaymentAmortizationFormProps) {
  const handleCalc = () => {
    const pendingAmount = Number(payment.pending_amount) - (Number(getValues().amount_one) + Number(getValues().amount_three) + (Number(getValues().amount_two) * Number(getValues().currency_rate)));
    setPending(pendingAmount);
    setValue('pending_amount', pendingAmount);
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <label htmlFor="amount_one" className="w-full text-sm font-bold text-slate-700 p-1">
          Pago en Bs.
        </label>
        <input
          type="number"
          step='any'
          id="amount_one"
          min={0}
          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Pago en Bs."
          {...register("amount_one")}
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-2">
        <label htmlFor="amount_two" className="w-full text-sm font-bold text-slate-700 p-1">
          Pago en $
        </label>
        <input
          type="number"
          step='any'
          id="amount_two"
          min={0}
          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Pago en $"
          {...register("amount_two")}
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-2">
        <label htmlFor="amount_three" className="w-full text-sm font-bold text-slate-700 p-1">
          Pago con TDD/TDC
        </label>
        <input
          type="number"
          step='any'
          id="amount_three"
          min={0}
          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Pago con Tarjeta de Débito/Crédito"
          {...register("amount_three")}
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-2">
        <label htmlFor="currency_rate" className="w-full text-sm font-bold text-slate-700 p-1">
          Tasa de Cambio
        </label>
        <input
          type="number"
          step='any'
          id="currency_rate"
          min={0}
          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Tasa de Cambio"
          {...register("currency_rate")}
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-2">
        <label htmlFor="pending_amount" className="w-full text-sm font-bold text-slate-700 p-1">
          Monto Pendiente
        </label>
        <input
          type="number"
          step='any'
          id="pending_amount"
          min={0}
          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Monto Pendiente"
          {...register("pending_amount")}
        />
      </div>
      {errors.pending_amount && (
        <ErrorMessage>{errors.pending_amount?.message}</ErrorMessage>
      )}
      <button
        className="bg-green-600 hover:bg-green-700 rounded-sm p-1 transition-all ease-in-out duration-300" title="Calcular"
        type="button"
        onClick={handleCalc}
      >
        <BanknotesIcon className="text-white w-4" />
      </button>
    </>
  );
}