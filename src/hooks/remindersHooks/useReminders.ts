import { getReminders } from "@/api/RemindersAPI";
import { Reminders } from "@/types/types";
import { contactResults } from "@/utils/dictionaries";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const useReminders = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const contactResultsKeys = Object.keys(contactResults);
  const contactResultsCount: {contactResult: string, quantity: number | undefined}[] = [];
  contactResultsKeys.map(contact => {
    const contactsXResult = data?.filter(reminder => reminder.result === contact.toLowerCase());
    const contactCount = {
      contactResult: contact.toLowerCase(),
      quantity: contactsXResult?.length
    };
    contactResultsCount.push(contactCount);
  });

  const pendingReminders: Reminders = [];
  const date = Date.now();
  data?.map(reminder => {
    if (
      Math.round((date - Date.parse(reminder.createdAt)) / 1000 / 60 / 60 / 24) >= 61 &&
      reminder.result === 'pending'
    ) {
      pendingReminders.push(reminder);
    }
  });

  const totalData = data ? data?.length : 0;
  const skipData = Number(skipSelected);
  const pagesData = Math.ceil(totalData / skipData);
  const reminders: Reminders = data ? data.filter(customer => (data?.indexOf(customer) + 1) >= ((skipData * (Number(pageSelected) - 1)) + 1) && (data?.indexOf(customer) + 1) <= (Number(pageSelected) * skipData)) : [];

  const headersTable = {
    customer: 'cliente',
    contact_date: 'fecha_contacto',
    result: 'estatus_contacto'
  };

  const remindersData: {}[] = [];
  data?.map(reminder => {
    const reportReminder = {
      customer: `${reminder.service.customer.name} ${reminder.service.customer.last_name}`,
      contact_date: reminder.createdAt,
      result: reminder.result
    };
    remindersData.push(reportReminder);
  });

  const paginationData = {
    totalData,
    skipData,
    pagesData,
    headersTable,
    remindersData
  };

  return { data, isError, isLoading, contactResultsCount, pendingReminders, paginationData, reminders };
};