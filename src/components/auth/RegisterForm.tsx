import { UserRegistrationForm } from "@/types/types";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ErrorMessage from "../globals/ErrorMessage";
import { rolesListTranslations } from "@/utils/es";

type RegisterFormProps = {
  register: UseFormRegister<UserRegistrationForm>;
  errors: FieldErrors<UserRegistrationForm>;
  watch: UseFormWatch<UserRegistrationForm>;
};

export default function RegisterForm({register, errors, watch}: RegisterFormProps) {
  const roles = Object.keys(rolesListTranslations);
  const password = watch('password');
  return (
    <>
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

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label
          className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
          htmlFor="name"
        >Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Nombre de Registro"
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("name", {
            required: "El Nombre de usuario es obligatorio",
          })}
        />
        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label
          className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1 text-center mb-1"
          htmlFor="role"
        >Permisos</label>
        <select
          id="role"
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("role", {
            required: "Debe seleccionar los permisos del usuario",
          })}
        >
          <option value="">Seleccione</option>
          {roles.map(rol => (
            <option value={rol} key={rol}>{rolesListTranslations[rol]}</option>
          ))}

        </select>
        {errors.role && (
          <ErrorMessage>{errors.role.message}</ErrorMessage>
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
    </>
  );
}