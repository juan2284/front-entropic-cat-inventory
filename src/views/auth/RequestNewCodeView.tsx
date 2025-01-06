import { requestConfirmationCode } from "@/api/AuthAPI";
import ErrorMessage from "@/components/globals/ErrorMessage";
import { RequestConfirmationCodeForm } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: ''
  };
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/auth/login');
    }
  });
  const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData);
  return (
    <>
      <section className="p-4">
        <article className="rounded-sm py-8 border border-gray-200">
          <div className="flex flex-col justify-between items-center">
            <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Solicitar un nuevo Código</h4>

            <form
              onSubmit={handleSubmit(handleRequestCode)}
              className="w-1/2 p-3 m-auto font-roboto"
              noValidate
            >
              <div className="w-full flex flex-row justify-center items-center gap-2">
                <label
                  className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
                  htmlFor="email"
                >Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                  {...register("email", {
                    required: "El Email de registro es obligatorio",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "E-mail no válido",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </div>

              <input
                type="submit"
                value='Enviar Código'
                className="bg-indigo-600 text-xs font-roboto mt-2 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
              />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
              <Link
                to='/auth/login'
                className="text-center font-roboto text-xs text-gray-400 font-normal hover:text-gray-500 transition-all ease-in-out duration-300"
              >
                ¿Ya tienes usuario? Iniciar Sesión
              </Link>
              <Link
                to='/auth/recuperar-password'
                className="text-center font-roboto text-xs text-gray-400 font-normal hover:text-gray-500 transition-all ease-in-out duration-300"
              >
                ¿Olvidaste tu contraseña? Reestablecer
              </Link>
            </nav>
          </div>
        </article>
      </section>
    </>
  );
}