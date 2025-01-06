import { Suppliers, TransactionsSuppliersDetailsType } from "@/types/types";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import ChargeBar from "@/components/suppliers/ChargeBar";

type HeaderSuppliersProps = {
  data: TransactionsSuppliersDetailsType;
  suppliers: Suppliers;
};

export default function HeaderSuppliers({data, suppliers}: HeaderSuppliersProps) {
  const dataBar = {
    transactions: data.totalQuantityPaid + data.totalQuantityPending,
    paid: data.totalQuantityPaid,
    pending: data.totalQuantityPending
  }
  return (
    <>
      <section className="flex flex-row flex-wrap justify-start items-center border-b border-b-gray-200">

        <article className=" w-3/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Proveedores Registrados</h4>
          <h5 className="w-full text-4xl text-center font-bold text-indigo-600">{suppliers.length}</h5>
          <h5 className="w-full text-xs text-center font-bold">Proveedores</h5>
        </article>

        <article className=" w-3/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Total por Pagar</h4>
          <h5 className="w-full text-xs text-center font-bold">Monto: <span className="text-red-600">{formatCurrencyLocal(data.totalAmountPending)}</span></h5>
        </article>

        <article className=" w-6/12 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <ChargeBar data={dataBar} />
        </article>

      </section>
    </>
  );
}