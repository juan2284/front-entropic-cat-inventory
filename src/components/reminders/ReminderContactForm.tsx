import { updateContactReminder } from "@/api/RemindersAPI";
import { ListActions } from "@/reducers/customerReducer";
import { Reminder, RemindersFilterView } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ChangeContactForm from "./ChangeContactForm";
import { useNavigate } from "react-router-dom";
import ContactMessage from "./ContactMessage";

type ReminderContactFormProps = {
  reminder: Reminder;
  dispatch: Dispatch<ListActions>;
};

export default function ReminderContactForm({reminder, dispatch}: ReminderContactFormProps) {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<RemindersFilterView>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateContactReminder,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['reminder', reminder._id] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: RemindersFilterView) => {
    const reminderContactUpdate = {
      id: reminder._id,
      result: data.contact
    };

    mutate(reminderContactUpdate);
    reset();
    dispatch({ type: 'show-edit' });
    dispatch({type: 'clear-states'});
    navigate('/recordatorios');
  };

  useEffect(() => {
    setValue('contact', reminder.result);
  }, [reminder]);
  return (
    <>
      <ContactMessage service={reminder.service} />

      <form
        className="w-full p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >

        <div className="w-full text-center flex flex-row justify-between items-center gap-2">
          <ChangeContactForm register={register} errors={errors} />
        </div>

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Guardar Contacto</button>

          <button
            type="button"
            className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => dispatch({ type: 'show-edit' })}
          >Close</button>
        </div>
      </form>
    </>
  );
}