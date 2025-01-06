import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";
import { TransactionsCustomersDetailsType } from "@/types/types";
import PayBar from "@/components/payments/PayBar";

type HeaderPaymentsProps = {
  data: TransactionsCustomersDetailsType;
};

export default function HeaderPayments({data}: HeaderPaymentsProps) {
  const dataBar = {
    transactions: data.totalNumberTransactions,
    paid: data.totalQuantityPaid,
    pending: data.totalQuantityPending
  }
  return (
    <>
      <section className="flex flex-row flex-wrap justify-start items-center border-b border-b-gray-200">

        <article className=" w-2/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Ventas Brutas</h4>
          <h5 className="w-full text-lg text-center font-bold text-indigo-600">{formatCurrencyLocal(data.grossAmountPurchases)}</h5>
          <h5 className="w-full text-xs text-center font-bold">{data.totalQuantityProducts} Unidades Vendidas</h5>
          <h5 className="w-full text-xs text-center font-bold">{data.totalNumberTransactions} Transacciones</h5>
        </article>

        <article className=" w-2/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Monto Recibido</h4>
          <h5 className="w-full text-lg text-center font-bold text-indigo-600">{formatCurrencyLocal(data.totalAmountReceived)}</h5>
          <h5 className="w-full text-xs text-center font-bold">Monto por Cobrar: <span className="text-red-600">{formatCurrencyLocal(data.totalAmountPending)}</span></h5>
        </article>

        <article className=" w-3/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Desglose de Recibidos</h4>
          <h5 className="w-full text-xs text-start font-bold">Monto Bs.: <span className="text-teal-600">{formatCurrencyLocal(data.totalLocalReceived)}</span></h5>
          <h5 className="w-full text-xs text-start font-bold">Monto $: <span className="text-teal-600">{formatCurrency(data.totalCurrencyReceived)}</span></h5>
          <h5 className="w-full text-xs text-start font-bold">Monto Tarjeta: <span className="text-teal-600">{formatCurrencyLocal(data.totalCardReceived)}</span></h5>
        </article>

        <article className=" w-5/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <PayBar data={dataBar} />
        </article>

      </section>
    </>
  );
}