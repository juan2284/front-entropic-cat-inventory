import { updatePasswordWithToken } from "@/api/AuthAPI";
import { ConfirmToken, NewPasswordFormType } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../globals/ErrorMessage";

type NewPasswordFormProps = {
  token: ConfirmToken['token'];
};

export default function NewPasswordForm({token} : NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordFormType = {
    password: '',
    password_confirmation: ''
  };
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate('/auth/login');
    }
  });

  const handleNewPassword = (formData: NewPasswordFormType) => {
    const data = {
      formData,
      token
    };
    mutate(data);
  };

  const password = watch('password');
  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="w-1/2 p-3 m-auto font-roboto"
        noValidate
      >

        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label
            className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
            htmlFor="password"
          >Password</label>

          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            {...register("password", {
              required: "El Password es obligatorio",
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
            className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
            htmlFor="password_confirmation"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Establecer Password'
          className="bg-indigo-600 text-xs font-roboto mt-2 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
        />
      </form>
    </>
  );
}