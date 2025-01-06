import Loader from "@/components/globals/Loader";
import Logo from "@/components/globals/Logo";
import PaginationReports from "@/components/globals/PaginationReports";
import HeaderReminders from "@/components/reminders/HeaderReminders";
import RemindersTable from "@/components/reminders/RemindersTable";
import SearchReminder from "@/components/reminders/SearchReminder";
import SelectFilterRemindersModal from "@/components/reminders/SelectFilterRemindersModal";
import { useReminders } from "@/hooks/remindersHooks/useReminders";
import { ListActions } from "@/reducers/customerReducer";
import { Reminder, Reminders } from "@/types/types";
import { ChatBubbleOvalLeftEllipsisIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "lucide-react";
import { Dispatch } from "react";
import { Link } from "react-router-dom";

type RemindersViewProps = {
  state: {
    show: boolean;
    reminders: Reminders;
    searchReminder: Reminders;
    viewAddCustomer: boolean;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    reminderDetails: Reminder;
  },
  dispatch: Dispatch<ListActions>;
};

export default function RemindersView({state, dispatch}: RemindersViewProps) {
  const { data, isLoading, isError, paginationData, reminders } = useReminders();
  const remindersPaginated = state?.reminders.length !== 0 ? state?.reminders : reminders;

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Recordatorios Registrados</h4>

      <Link
        className="w-1/4 flex flex-row justify-center items-center gap-1 p-2 mt-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300"
        to={'/agregar-servicio'}
      >
        <PlusCircleIcon className="w-4 h-4" />
        Agregar Servicio
      </Link>
      <Link
        className="w-1/4 flex flex-row justify-center items-center gap-1 p-2 mt-2 bg-green-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-green-700 transition-all ease-in-out duration-300"
        to={'/recordatorios-pendientes'}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
        Gestionar Recordatorios
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
        <SearchReminder reminders={data} dispatch={dispatch} />
        <HeaderReminders />
      </header>

      <main className="p-4">
        {state?.searchReminder && state.searchReminder.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <RemindersTable state={state!} reminders={state.searchReminder} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Todos los Recordatorios</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <XMarkIcon
                  className={`${state?.reminders.length !== 0 ? '' : 'hidden'} w-3 h-3 hover:text-indigo-500 cursor-pointer transition-all ease-in-out duration-300`}
                  title="Eliminar Filtros"
                  onClick={() => dispatch({ type: 'clear-filters' })}
                />
                <button
                  className="flex flex-row justify-between items-center gap-1 p-2 bg-gray-200 text-gray-600 rounded-sm font-semibold font-roboto text-xs hover:bg-gray-300 transition-all ease-in-out duration-300 relative"
                  onClick={() => dispatch({ type: 'show-modal' })}
                  title="Filtrar Clientes"
                >
                  <div className={`${state?.reminders.length !== 0 ? '' : 'hidden'} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
                  <FunnelIcon className="w-3 h-3" />
                  Filtros
                </button>
                <Link
                  className={`${state?.viewAddCustomer ? 'hidden' : ''} flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300`}
                  to={'/agregar-servicio'}
                ><PlusCircleIcon className="w-4 h-4" />Agregar Servicio</Link>
                <Link
                  className={`flex flex-row justify-between items-center gap-1 p-2 bg-green-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-green-700 transition-all ease-in-out duration-300`}
                  to={'/recordatorios-pendientes'}
                ><ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />Recordatorios Pendientes</Link>
              </div>
            </div>

            <div className="border-y border-y-gray-300 my-2 p-1">
              <PaginationReports paginationData={paginationData} dataName="Recordatorios Registrados" />
            </div>

            <RemindersTable state={state!} reminders={remindersPaginated!} dispatch={dispatch} />
          </article>
        </section>
      </main>

      <SelectFilterRemindersModal state={state!} reminders={remindersPaginated!} dispatch={dispatch} />
    </>
  );
}