import Loader from "@/components/globals/Loader";
import Logo from "@/components/globals/Logo";
import PaginationReports from "@/components/globals/PaginationReports";
import DeleteServiceModal from "@/components/services/DeleteServiceModal";
import EditServiceForm from "@/components/services/EditServiceForm";
import HeaderServices from "@/components/services/HeaderServices";
import SearchService from "@/components/services/SearchService";
import SelectFilterServicesModal from "@/components/services/SelectFilterServicesModal";
import ServicesOfMonthTable from "@/components/services/ServicesOfMonthTable";
import { useServices } from "@/hooks/ServicesHooks/useServices";
import { ListActions } from "@/reducers/customerReducer";
import { Service, Services } from "@/types/types";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "lucide-react";
import { Dispatch } from "react";
import { Link } from "react-router-dom";

type ServicesViewProps = {
  state: {
    show: boolean;
    services: Services;
    searchService: Services;
    viewAddCustomer: boolean;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    serviceDetails: Service;
  },
  dispatch: Dispatch<ListActions>;
};

export default function ServicesView({state, dispatch}: ServicesViewProps) {
  const { data, isLoading, isError, paginationData, services } = useServices();
  const servicesPaginated = state?.services.length !== 0 ? state?.services : services;

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Servicios Registrados</h4>

      <Link
        className="w-1/4 flex flex-row justify-center items-center gap-1 p-2 mt-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300"
        to={'/agregar-servicio'}
      >
        <PlusCircleIcon className="w-4 h-4" />
        Agregar Servicio
      </Link>
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
        <SearchService services={data} dispatch={dispatch} />
        <HeaderServices />
      </header>

      <main className="p-4">
        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Editar Servicio:</h4>
              <EditServiceForm state={state} dispatch={dispatch} />
            </article>
          </section>
        )}

        {state?.searchService && state.searchService.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <ServicesOfMonthTable state={state!} services={state.searchService} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Servicios</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <XMarkIcon
                  className={`${state?.services.length !== 0 ? '' : 'hidden'} w-3 h-3 hover:text-indigo-500 cursor-pointer transition-all ease-in-out duration-300`}
                  title="Eliminar Filtros"
                  onClick={() => dispatch({ type: 'clear-filters' })}
                />
                <button
                  className="flex flex-row justify-between items-center gap-1 p-2 bg-gray-200 text-gray-600 rounded-sm font-semibold font-roboto text-xs hover:bg-gray-300 transition-all ease-in-out duration-300 relative"
                  onClick={() => dispatch({ type: 'show-modal' })}
                  title="Filtrar Clientes"
                >
                  <div className={`${state?.services.length !== 0 ? '' : 'hidden'} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
                  <FunnelIcon className="w-3 h-3" />
                  Filtros
                </button>
                <Link
                  className={`${state?.viewAddCustomer ? 'hidden' : ''} flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300`}
                  to={'/agregar-servicio'}
                ><PlusCircleIcon className="w-4 h-4" />Agregar Servicio</Link>
              </div>
            </div>

            <div className="border-y border-y-gray-300 my-2 p-1">
              <PaginationReports paginationData={paginationData} dataName="Servicios" />
            </div>

            <ServicesOfMonthTable state={state} services={servicesPaginated!} dispatch={dispatch} />
          </article>
        </section>
      </main>

      <SelectFilterServicesModal services={servicesPaginated!} state={state!} dispatch={dispatch} />
      <DeleteServiceModal state={state!} dispatch={dispatch} />
    </>
  );
}