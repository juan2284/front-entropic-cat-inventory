import { Reminders } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { contactResultsTranslation } from "@/utils/es";

type RemindersReportTableProps = {
  reminders: Reminders;
};

export default function RemindersReportTable({reminders}: RemindersReportTableProps) {
  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Cliente</th>
            <th className='font-light p-2 bg-gray-100'>Fecha de Contacto</th>
            <th className='font-light p-2 bg-gray-100'>Recordatorio</th>
          </tr>
        </thead>

        <tbody>
          {reminders.length !== 0 ? (
            <>
              {reminders.map(reminder => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={reminder._id}>
                  <td className='p-2'>{reminder.service.customer.name} {reminder.service.customer.last_name}</td>
                  <td className='p-2'>{formatDate(reminder.createdAt)}</td>
                  <td className='p-2'>{contactResultsTranslation[reminder.result]}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}