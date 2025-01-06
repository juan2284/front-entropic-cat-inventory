import { AddPaymentFormType } from "@/types/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";
import { ProductsArray } from "./AddPaymentForm";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

type CurrencyRateFormProps = {
  setCurrencyRate: Dispatch<SetStateAction<number>>;
  setProducts: Dispatch<SetStateAction<ProductsArray | undefined>>;
  setProductSelected: Dispatch<SetStateAction<string>>;
  setQuantityProduct: Dispatch<SetStateAction<number>>;
  setTotalAmountOne: Dispatch<SetStateAction<number>>;
  setTotalAmountTwo: Dispatch<SetStateAction<number>>;
  setValue: UseFormSetValue<AddPaymentFormType>;
};

export default function CurrencyRateForm({setCurrencyRate, setProducts, setProductSelected, setQuantityProduct, setTotalAmountOne, setTotalAmountTwo, setValue}: CurrencyRateFormProps) {
  const handleCurrency = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrencyRate(Number(e.target.value));
    setProducts([]);
    setValue('total_amount', 0);
    setValue('amount_one', 0);
    setValue('amount_two', 0);
    setValue('amount_three', 0);
    setValue('pending_amount', 0);
    setTotalAmountOne(0);
    setTotalAmountTwo(0);
    setProductSelected('');
    setQuantityProduct(0);
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-sm p-2">
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label htmlFor="currency_rate" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
            Tasa de Cambio
          </label>
          <input
            type="number"
            id="currency_rate"
            min={0}
            className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Tasa de Cambio"
            step="any"
            onChange={(e) => handleCurrency(e)}
          />
          <QuestionMarkCircleIcon className="w-5 h-5 text-gray-600 hover:text-red-600 transition-all ease-in-out duration-300 cursor-pointer" title="Ingresa la tasa de cambio para los cálculos de la transacción. Si modificas o eliminas la tasa, toda la información ya ingresada se reiniciará." />
        </div>
      </div>
    </>
  );
}