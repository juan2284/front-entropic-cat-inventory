import { ListActions } from "@/reducers/customerReducer";
import { Reminder, Reminders } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { contactResultsTranslation } from "@/utils/es";
import { QueueListIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";

type RemindersTableProps = {
  state: {
    searchReminder: Reminders;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    reminderDetails: Reminder;
  },
  reminders: Reminders;
  dispatch: Dispatch<ListActions>;
};

export default function RemindersTable({state, reminders, dispatch}: RemindersTableProps) {
  const navigate = useNavigate();

  const handleDetails = (reminder: Reminder) => {
    dispatch({ type: 'set-reminder-details', payload: { reminder } });
    dispatch({ type: 'show-details', payload: { result: true } });
    navigate(`/recordatorios/${reminder._id}`);
  };
  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>ID</th>
            <th className='font-light p-2 bg-gray-100'>Cliente</th>
            <th className='font-light p-2 bg-gray-100'>Fecha del Servicio</th>
            <th className='font-light p-2 bg-gray-100'>Recordatorio</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Detalles</th>
          </tr>
        </thead>

        <tbody>
          {reminders.length !== 0 ? (
            <>
              {reminders.map(reminder => (
                <tr className={`${reminder.service._id === state.reminderDetails._id && state.viewEditCustomer ? 'text-red-600' : 'text-gray-600'} border-b border-b-gray-300 font-bold`} key={reminder._id}>
                  <td className='p-2'>#{reminder.service.payment._id.slice(-5)}</td>
                  <td className='p-2'>
                    <Link to={`/clientes/${reminder.service.customer._id}`} title="Ver detalles de la Transacción" className="hover:text-gray-400">
                      <div className="flex flex-col justify-center items-center">
                        <p>{reminder.service.customer.name} {reminder.service.customer.last_name}</p>
                      </div>
                    </Link>
                  </td>
                  <td className='p-2'>{formatDate(reminder.service.service_date)}</td>
                  <td className='p-2'>{contactResultsTranslation[reminder.result]}</td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-400 flex justify-center items-center font-bold group"
                      onClick={() => handleDetails(reminder)}
                      title="Detalles"
                    >
                      <QueueListIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}