import SearchCustomer from "@/components/customers/SearchCustomer";
import { Dispatch } from "react";
import CustomersTable from "@/components/customers/CustomersTable";
import { FunnelIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ListActions } from "@/reducers/customerReducer";
import SelectFilterModal from "@/components/customers/SelectFilterModal";
import AddCustomerForm from "@/components/customers/AddCustomerForm";
import DeleteCustomerModal from "@/components/customers/DeleteCustomerModal";
import EditCustomerForm from "@/components/customers/EditCustomerForm";
import { useCustomers } from "@/hooks/customersHooks/useCustomers";
import { Customer, Customers } from "@/types/types";
import HeaderCustomers from "@/components/customers/HeaderCustomers";
import Loader from "@/components/globals/Loader";
import PaginationReports from "@/components/globals/PaginationReports";
import Logo from "@/components/globals/Logo";

type CustomersViewProps = {
  state: {
    customerDetails: Customer;
    customers: Customers;
    searchCustomer: Customers;
    paymentFilter: string;
    show: boolean;
    viewDeleteCustomer: boolean;
    filteredCustomers: boolean;
    viewAddCustomer: boolean;
    viewEditCustomer: boolean;
    viewDetailsCustomer: boolean;
  },
  dispatch: Dispatch<ListActions>;
};

export default function CustomersView({state, dispatch}: CustomersViewProps) {
  const { data, isLoading, isError, paginationData, customers } = useCustomers();
  const paginatedCustomers = state?.customers.length !== 0 ? state?.customers : customers;

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Clientes Registrados</h4>

      <AddCustomerForm dispatch={dispatch} isError={isError} />
    </div>
  );
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <header>
        <SearchCustomer customers={data} dispatch={dispatch} />
        <HeaderCustomers customers={data!} />
      </header>

      <main className="p-4">

        {state?.viewAddCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Agregar Nuevo Cliente:</h4>
              <AddCustomerForm dispatch={dispatch} isError={isError} />
            </article>
          </section>
        )}

        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Editar Cliente:</h4>
              <EditCustomerForm state={state} dispatch={dispatch} />
            </article>
          </section>
        )}

        {state?.searchCustomer && state.searchCustomer.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <CustomersTable state={state!} customers={state.searchCustomer} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Todos los Clientes</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <XMarkIcon
                  className={`${state?.customers.length !== 0 ? '' : 'hidden'} w-3 h-3 hover:text-indigo-500 cursor-pointer transition-all ease-in-out duration-300`}
                  title="Eliminar Filtros"
                  onClick={() => dispatch({type: 'clear-filters'})}
                />
                <button
                  className="flex flex-row justify-between items-center gap-1 p-2 bg-gray-200 text-gray-600 rounded-sm font-semibold font-roboto text-xs hover:bg-gray-300 transition-all ease-in-out duration-300 relative"
                  onClick={() => dispatch({type: 'show-modal'})}
                  title="Filtrar Clientes"
                >
                  <div className={`${state?.customers.length !== 0 ? '' : 'hidden'} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
                  <FunnelIcon className="w-3 h-3" />
                  Filtros
                </button>
                <button
                  className={`${state?.viewAddCustomer ? 'hidden' : ''} flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300`}
                  onClick={() => dispatch({type: 'show-add'})}
                ><PlusCircleIcon className="w-4 h-4" /> Agregar Cliente</button>
              </div>
            </div>

            <div className="border-y border-y-gray-300 my-2 p-1">
              <PaginationReports paginationData={paginationData} dataName="Clientes Registrados" />
            </div>

            <CustomersTable state={state!} customers={paginatedCustomers!} dispatch={dispatch} />
          </article>
        </section>
      </main>

      <SelectFilterModal customers={paginatedCustomers!} state={state!} dispatch={dispatch} />
      <DeleteCustomerModal state={state!} dispatch={dispatch} />
    </>
  );
}