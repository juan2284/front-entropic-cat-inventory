import { TransactionsSuppliersDetailsType } from "@/types/types";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";
import ChargeBar from "@/components/suppliers/ChargeBar";

type HeaderChargesProps = {
  data: TransactionsSuppliersDetailsType;
};

export default function HeaderCharges({data}: HeaderChargesProps) {
  const dataBar = {
    transactions: data.totalQuantityPaid + data.totalQuantityPending,
    paid: data.totalQuantityPaid,
    pending: data.totalQuantityPending
  }
  return (
    <section className="flex flex-row flex-wrap justify-start items-center border-b border-b-gray-200">

      <article className="w-2/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
        <h4 className="w-full text-xs text-center font-light text-gray-500">Monto Total Bruto</h4>
        <h5 className="w-full text-lg text-center font-bold text-indigo-600">{formatCurrencyLocal(data.grossAmount)}</h5>
      </article>

      <article className="w-2/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
        <h4 className="w-full text-xs text-center font-light text-gray-500">Monto Pagado</h4>
        <h5 className="w-full text-lg text-center font-bold text-indigo-600">{formatCurrencyLocal(data.totalAmountDelivered)}</h5>
        <h5 className="w-full text-xs text-center font-bold">Monto por Pagar: <span className="text-red-600">{formatCurrencyLocal(data.totalAmountPending)}</span></h5>
      </article>

      <article className="w-3/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
        <h4 className="w-full text-xs text-center font-light text-gray-500">Desglose de Pagos</h4>
        <h5 className="w-full text-xs text-start font-bold">Monto Bs.: <span className="text-teal-600">{formatCurrencyLocal(data.totalLocalDelivered)}</span></h5>
        <h5 className="w-full text-xs text-start font-bold">Monto $: <span className="text-teal-600">{formatCurrency(data.totalCurrencyDelivered)}</span></h5>
        <h5 className="w-full text-xs text-start font-bold">Monto Tarjeta: <span className="text-teal-600">{formatCurrencyLocal(data.totalCardDelivered)}</span></h5>
      </article>

      <article className="w-5/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
        <ChargeBar data={dataBar} />
      </article>

    </section>
  );
}