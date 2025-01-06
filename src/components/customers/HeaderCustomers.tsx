import { Customers } from "@/types/types";

type HeaderCustomersProps = {
  customers: Customers;
};

export default function HeaderCustomers({customers}: HeaderCustomersProps) {
  return (
    <>
      <section className="flex flex-row flex-wrap justify-start items-center border-b border-b-gray-200">

        <article className=" w-full flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Clientes Registrados</h4>
          <h5 className="w-full text-4xl text-center font-bold text-indigo-600">{customers.length}</h5>
          <h5 className="w-full text-xs text-center font-bold">Clientes</h5>
        </article>

      </section>
    </>
  );
}