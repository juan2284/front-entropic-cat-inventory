import { getReminderById } from "@/api/RemindersAPI";
import { Reminder } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useReminderById = (reminderId: Reminder['_id']) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['payment', reminderId],
    queryFn: () => getReminderById(reminderId),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};