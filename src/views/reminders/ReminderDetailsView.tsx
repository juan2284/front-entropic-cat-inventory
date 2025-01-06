import Loader from "@/components/globals/Loader";
import ContactButton from "@/components/reminders/ContactButton";
import ReminderContactForm from "@/components/reminders/ReminderContactForm";
import ServiceDetailsTable from "@/components/reminders/ServiceDetailsTable";
import { useReminderById } from "@/hooks/remindersHooks/useReminderById";
import { ListActions } from "@/reducers/customerReducer";
import { Reminder, Reminders, Service, Services } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { BellAlertIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link, useParams } from "react-router-dom";

type ReminderDetailsViewProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    searchReminder: Reminders;
    reminderDetails: Reminder;
    searchService: Services;
    serviceDetails: Service;
  },
  dispatch: Dispatch<ListActions>;
};

export default function ReminderDetailsView({state, dispatch}: ReminderDetailsViewProps) {
  const params = useParams();
  const reminderId: Reminder['_id'] = state.reminderDetails._id ? state.reminderDetails._id : params.reminderId!;
  const { data, isLoading, isError } = useReminderById(reminderId);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
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
          >#{data?.service.payment._id.slice(-5)} - {formatDate(data?.service.service_date)}<BellAlertIcon className="w-6 h-6 text-indigo-600" /></h3>
        </div>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Servicio:</h4>
          <ServiceDetailsTable state={state} services={[data.service]} />
          <ContactButton dispatch={dispatch} />
        </article>

        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mt-4">
            <article>
              <h4 className="pt-2 text-xl font-oswald text-gray-600 mb-2">Contactar Cliente:</h4>
              <ReminderContactForm reminder={data} dispatch={dispatch} />
            </article>
          </section>
        )}
      </section>
    </>
  );
}