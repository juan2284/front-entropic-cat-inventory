import ErrorMessage from "@/components/globals/ErrorMessage";
import { Customer } from "@/types/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type CustomerFormProps = {
  register: UseFormRegister<Customer>;
  errors: FieldErrors<Customer>;
};

export default function CustomerForm({register, errors}: CustomerFormProps) {
  return (
    <>
      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="name" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Nombre"
          {...register("name", {
            required: "El nombre del cliente es obligatorio"
          })}
        />
      </div>
      {errors.name && (
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="last_name" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Apellido
        </label>
        <input
          type="text"
          id="last_name"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Apellido"
          {...register("last_name", {
            required: "El apellido del cliente es obligatorio"
          })}
        />
      </div>
      {errors.last_name && (
        <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="identity_number" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Cédula
        </label>
        <input
          type="text"
          id="identity_number"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Cédula"
          {...register("identity_number", {
            required: "Debe indicar el número de cédula del cliente"
          })}
        />
      </div>
      {errors.identity_number && (
        <ErrorMessage>{errors.identity_number?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="telephone" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Teléfono
        </label>
        <input
          type="text"
          id="telephone"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Teléfono"
          {...register("telephone", {
            required: "Debe indicar el teléfono del cliente"
          })}
        />
      </div>
      {errors.telephone && (
        <ErrorMessage>{errors.telephone?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="email" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Email"
          {...register("email", {
            required: "Suministre un correo electrónico del cliente"
          })}
        />
      </div>
      {errors.email && (
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      )}
    </>
  );
}