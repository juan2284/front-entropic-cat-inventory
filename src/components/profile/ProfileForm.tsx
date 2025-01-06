import { updateProfile } from "@/api/ProfileAPI";
import { User, UserProfileForm } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorMessage from "../globals/ErrorMessage";

type ProfileFormProps = {
  data: User;
};

export default function ProfileForm({ data } : ProfileFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
  const handleEditProfile = (formData: UserProfileForm) => mutate(formData);
  return (
    <>
      <section className="p-4">
        <article className="rounded-sm py-10 border border-gray-200">
          <div className="flex flex-col justify-between items-center">
            <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Mi Perfil</h4>

            <form
              onSubmit={handleSubmit(handleEditProfile)}
              className="w-1/2 p-3 m-auto font-roboto"
              noValidate
            >
              <div className="w-full flex flex-row justify-center items-center gap-2">
                <label
                  className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
                  htmlFor="name"
                >Nombre</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu Nombre"
                  className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                  {...register("name", {
                    required: "Nombre de usuario es obligatoro",
                  })}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
              </div>

              <div className="w-full flex flex-row justify-center items-center gap-2">
                <label
                  className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
                  htmlFor="email"
                >E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Tu Email"
                  className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                  {...register("email", {
                    required: "EL e-mail es obligatorio",
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
                value='Guardar Cambios'
                className="bg-indigo-600 text-xs font-roboto mt-2 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
              />
            </form>
          </div>
        </article>
      </section>
    </>
  );
}