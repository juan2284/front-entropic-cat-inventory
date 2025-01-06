import Loader from "@/components/globals/Loader";
import Logo from "@/components/globals/Logo";
import PaginationReports from "@/components/globals/PaginationReports";
import AddSupplierForm from "@/components/suppliers/AddSupplierForm";
import DeleteSupplierModal from "@/components/suppliers/DeleteSupplierModal";
import EditSupplierForm from "@/components/suppliers/EditSupplierForm";
import HeaderSuppliers from "@/components/suppliers/HeaderSuppliers";
import SearchSupplier from "@/components/suppliers/SearchSupplier";
import SelectFilterSuppliersModal from "@/components/suppliers/SelectFilterSuppliersModal";
import SuppliersTable from "@/components/suppliers/SuppliersTable";
import { useSuppliers } from "@/hooks/suppliersHooks/useSuppliers";
import { ListActions } from "@/reducers/customerReducer";
import { Supplier, Suppliers } from "@/types/types";
import { FunnelIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";

type SuppliersViewProps = {
  state: {
    supplierDetails: Supplier;
    suppliers: Suppliers;
    searchSupplier: Suppliers;
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

export default function SuppliersView({state, dispatch}: SuppliersViewProps) {
  const { data, isLoading, isError, transactionsSuppliersDetails, paginationData, suppliersPaginated } = useSuppliers();
  const suppliers = state?.suppliers.length !== 0 ? state?.suppliers : suppliersPaginated;

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay proveedores Registrados</h4>

      <AddSupplierForm dispatch={dispatch} isError={isError} />
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
        <SearchSupplier suppliers={data!} dispatch={dispatch} />
        <HeaderSuppliers data={transactionsSuppliersDetails} suppliers={data!} />        
      </header>

      <main className="p-4">
        {state?.viewAddCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Agregar Nuevo Proveedor:</h4>
              <AddSupplierForm dispatch={dispatch} isError={isError} />
            </article>
          </section>
        )}

        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Editar Proveedor:</h4>
              <EditSupplierForm state={state} dispatch={dispatch} />
            </article>
          </section>
        )}

        {state?.searchSupplier && state.searchSupplier.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <SuppliersTable state={state!} suppliers={state.searchSupplier} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Todos los Proveedores</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <XMarkIcon
                  className={`${state?.suppliers.length !== 0 ? '' : 'hidden'} w-3 h-3 hover:text-indigo-500 cursor-pointer transition-all ease-in-out duration-300`}
                  title="Eliminar Filtros"
                  onClick={() => dispatch({ type: 'clear-filters' })}
                />
                <button
                  className="flex flex-row justify-between items-center gap-1 p-2 bg-gray-200 text-gray-600 rounded-sm font-semibold font-roboto text-xs hover:bg-gray-300 transition-all ease-in-out duration-300 relative"
                  onClick={() => dispatch({ type: 'show-modal' })}
                  title="Filtrar Proveedores"
                >
                  <div className={`${state?.suppliers.length !== 0 ? '' : 'hidden'} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
                  <FunnelIcon className="w-3 h-3" />
                  Filtros
                </button>
                <button
                  className={`${state?.viewAddCustomer ? 'hidden' : ''} flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300`}
                  onClick={() => dispatch({ type: 'show-add' })}
                ><PlusCircleIcon className="w-4 h-4" /> Agregar Proveedor</button>
              </div>
            </div>

            <div className="border-y border-y-gray-300 my-2 p-1">
              <PaginationReports paginationData={paginationData} dataName="Clientes Registrados" />
            </div>

            <SuppliersTable state={state!} suppliers={suppliers!} dispatch={dispatch} />
          </article>
        </section>
      </main>

      <SelectFilterSuppliersModal suppliers={suppliers!} state={state!} dispatch={dispatch} />
      <DeleteSupplierModal state={state!} dispatch={dispatch} />
    </>
  );
}