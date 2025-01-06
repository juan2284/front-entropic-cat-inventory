import { formatCurrency } from "@/utils/formatCurrency";
import ErrorMessage from "../globals/ErrorMessage";
import { BanknotesIcon } from "@heroicons/react/20/solid";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AddPaymentFormType } from "@/types/types";

type AmountsFormProps ={
  register: UseFormRegister<AddPaymentFormType>;
  errors: FieldErrors<AddPaymentFormType>;
  getValues: UseFormGetValues<AddPaymentFormType>;
  setValue: UseFormSetValue<AddPaymentFormType>;
  currencyRate: number;
  totalAmountTwo: number;
};

export default function AmountsForm({register, errors, getValues, setValue, currencyRate, totalAmountTwo}: AmountsFormProps) {
  const handleCalc = () => {
    const pendingAmount =
      Number(getValues().total_amount) -
      (
        Number(getValues().amount_one) +
        Number(getValues().amount_three) +
        (
          Number(getValues().amount_two) *
          Number(currencyRate)
        )
      );

    setValue('pending_amount', Number(pendingAmount.toFixed(2)));
  };
  return (
    <>
      <div
        className="w-full flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-sm p-2"
      >
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label htmlFor="total_amount" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
            Monto Total (Bs.)
          </label>
          <input
            type="number"
            id="total_amount"
            min={1}
            className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Monto Total"
            step="any"
            {...register("total_amount", {
              required: "Indique el monto Pagado en Bs. Puede ser 0"
            })}
          />
        </div>
        {errors.total_amount && (
          <ErrorMessage>{errors.total_amount?.message}</ErrorMessage>
        )}

        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label htmlFor="total_amount" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
            Monto Total ($)
          </label>
          <div className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-400 text-left">
            {formatCurrency(totalAmountTwo)}
          </div>
        </div>

        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label htmlFor="amount_one" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
            Pago en Bs.
          </label>
          <input
            type="number"
            id="amount_one"
            min={0}
            className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Pago en Bs."
            step="any"
            {...register("amount_one", {
              required: "Indique el monto Pagado en Bs. Puede ser 0"
            })}
          />
        </div>
        {errors.amount_one && (
          <ErrorMessage>{errors.amount_one?.message}</ErrorMessage>
        )}

        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label htmlFor="amount_two" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
            Pago en $
          </label>
          <input
            type="number"
            id="amount_two"
            min={0}
            className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Pago en $"
            step="any"
            {...register("amount_two", {
              required: "Indique el monto Pagado en $. Puede ser 0"
            })}
          />
        </div>
        {errors.amount_two && (
          <ErrorMessage>{errors.amount_two?.message}</ErrorMessage>
        )}

        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label htmlFor="amount_three" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
            Pago con TDD/TDC
          </label>
          <input
            type="number"
            id="amount_three"
            min={0}
            className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Pago con Tarjeta de Débito/Crédito"
            step="any"
            {...register("amount_three", {
              required: "Indique el monto Pagado con Tarjeta de Débito/Crédito. Puede ser 0"
            })}
          />
        </div>
        {errors.amount_three && (
          <ErrorMessage>{errors.amount_three?.message}</ErrorMessage>
        )}

        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label htmlFor="pending_amount" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
            Monto Pendiente
          </label>
          <input
            type="number"
            id="pending_amount"
            min={0}
            className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Monto Pendiente"
            step="any"
            {...register("pending_amount")}
          />
          <button
            className="bg-green-600 hover:bg-green-700 rounded-sm p-1 transition-all ease-in-out duration-300" title="Calcular"
            type="button"
            onClick={handleCalc}
          >
            <BanknotesIcon className="text-white w-4" />
          </button>
        </div>
        {errors.pending_amount && (
          <ErrorMessage>{errors.pending_amount?.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}