import { changePassword } from "@/api/ProfileAPI";
import { UpdateCurrentUserPasswordForm } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorMessage from "../globals/ErrorMessage";

export default function ChangePassword() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  };
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues });
  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data)
  });
  const password = watch('password');
  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => mutate(formData);
  return (
    <>
      <section className="p-4">
        <article className="rounded-sm py-10 border border-gray-200">
          <div className="flex flex-col justify-between items-center">
            <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Cambiar Password</h4>

            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="w-1/2 p-3 m-auto font-roboto"
              noValidate
            >
              <div className="w-full flex flex-row justify-center items-center gap-2">
                <label
                  className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
                  htmlFor="current_password"
                >Password Actual</label>
                <input
                  id="current_password"
                  type="password"
                  placeholder="Password Actual"
                  className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                  {...register("current_password", {
                    required: "El password actual es obligatorio",
                  })}
                />
                {errors.current_password && (
                  <ErrorMessage>{errors.current_password.message}</ErrorMessage>
                )}
              </div>

              <div className="w-full flex flex-row justify-center items-center gap-2">
                <label
                  className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
                  htmlFor="password"
                >Nuevo Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Nuevo Password"
                  className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                  {...register("password", {
                    required: "El Nuevo Password es obligatorio",
                    minLength: {
                      value: 8,
                      message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                  })}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </div>

              <div className="w-full flex flex-row justify-center items-center gap-2">
                <label
                  htmlFor="password_confirmation"
                  className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
                >Repetir Password</label>

                <input
                  id="password_confirmation"
                  type="password"
                  placeholder="Repetir Password"
                  className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                  {...register("password_confirmation", {
                    required: "Este campo es obligatorio",
                    validate: value => value === password || 'Los Passwords no son iguales'
                  })}
                />
                {errors.password_confirmation && (
                  <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                )}
              </div>

              <input
                type="submit"
                value='Cambiar Password'
                className="bg-indigo-600 text-xs font-roboto mt-2 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
              />
            </form>
          </div>
        </article>
      </section>
    </>
  );
}