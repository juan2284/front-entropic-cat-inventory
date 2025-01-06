import RemindersTable from "@/components/reminders/RemindersTable";
import { useReminders } from "@/hooks/remindersHooks/useReminders";
import { ListActions } from "@/reducers/customerReducer";
import { Reminder, Reminders } from "@/types/types";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link } from "react-router-dom";

type RemindersPendingViewProps = {
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

export default function RemindersPendingView({state, dispatch}: RemindersPendingViewProps) {
  const { pendingReminders } = useReminders();
  return (
    <>
      <section className="p-4">
        <div className="w-full flex md:flex-row justify-center items-center gap-2 mb-4">
          <Link
            to={'/recordatorios'}
            className="w-1/5 bg-indigo-600 text-xs font-roboto text-center hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => { dispatch({ type: 'show-details', payload: { result: false } }); dispatch({ type: 'clear-states' }) }}
          >Regresar</Link>
          <h3
            className="w-4/5 font-black text-2xl text-slate-700 my-2 text-center flex flex-row justify-center items-center gap-2"
          >Recordatorios Pendientes<ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-indigo-600" /></h3>
        </div>

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Servicios Mayores a 2 Meses:</h4>
            </div>

            {pendingReminders.length !== 0 ? (
              <RemindersTable state={state!} reminders={pendingReminders!} dispatch={dispatch} />
            ) : (
              <>
                <h4 className="text-center text-gray-600 text-md font-roboto font-light">No hay Servicios pendientes</h4>              
              </>
            )}
          </article>
        </section>
      </section>
     </>
  );
}