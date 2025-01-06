import { ListActions } from "@/reducers/customerReducer";
import { BanknotesIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";

type AmortizationButtonProps = {
  dispatch: Dispatch<ListActions>;
};

export default function AmortizationButton({dispatch}: AmortizationButtonProps) {
  const handleAmortization = () => {
    dispatch({ type: 'show-edit' });
  };
  return (
    <>
      <button
        type="button"
        className="w-full flex flex-row justify-center items-center gap-2 bg-green-600 hover:bg-green-700 transition-all ease-in-out duration-300 text-xs font-bold uppercase text-white rounded-sm mx-auto p-2 mt-2"
        onClick={handleAmortization}
        title="Abonar a la Deuda"
      >
        <BanknotesIcon className="w-4 h-4 text-white" />
        Abonar
      </button>
    </>
  );
}