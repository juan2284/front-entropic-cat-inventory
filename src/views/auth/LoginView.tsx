import { authenticateUser } from "@/api/AuthAPI";
import ErrorMessage from "@/components/globals/ErrorMessage";
import { UserLoginForm } from "@/types/types"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  };
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
      navigate('/');
    }
  });
  const handleLogin = (formData: UserLoginForm) => mutate(formData);
  return (
    <>
      <section className="p-4">
        <article className="rounded-sm py-10 border border-gray-200">
          <div className="flex flex-col justify-between items-center">
            <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Iniciar Sesión</h4>

            <form
              onSubmit={handleSubmit(handleLogin)}
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
                    required: "El Email es obligatorio",
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
                  })}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </div>

              <input
                type="submit"
                value='Iniciar Sesión'
                className="bg-indigo-600 text-xs font-roboto mt-2 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
              />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
              <Link
                to={'/auth/recuperar-password'}
                className="text-center font-roboto text-xs text-gray-400 font-normal hover:text-gray-500 transition-all ease-in-out duration-300"
              >¿Olvidaste tu contraseña? Reestablecer</Link>
            </nav>
          </div>
        </article>
      </section>
    </>
  );
}