import api from "@/lib/axios";
import { reminderSchema, remindersSchema } from "@/types/schemas";
import { Reminder } from "@/types/types";
import { isAxiosError } from "axios";

export async function getReminders() {
  try {
    const { data } = await api('/reminder');
    const response = remindersSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getReminderById(id: Reminder['_id']) {
  try {
    const { data } = await api(`/reminder/${id}`);
    const response = reminderSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateContactReminder(formData: {id: Reminder['_id'], result: Reminder['result']}) {
  try {
    const { data } = await api.patch(`/reminder/edit-reminder/${formData.id}`, {result: formData.result});
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}