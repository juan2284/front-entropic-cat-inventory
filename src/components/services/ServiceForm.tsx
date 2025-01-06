import { ServiceFormType } from "@/types/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "@/components/globals/ErrorMessage";

type ServiceFormProps ={
  register: UseFormRegister<ServiceFormType>;
  errors: FieldErrors<ServiceFormType>;
};

export default function ServiceForm({register, errors}: ServiceFormProps) {
  return (
    <>
      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="vehicle" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Vehículo
        </label>
        <input
          type="text"
          id="vehicle"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Vehículo del Cliente"
          {...register("vehicle", {
            required: "Debe suministrar la marca o modelo del vehículo"
          })}
        />
      </div>
      {errors.vehicle && (
        <ErrorMessage>{errors.vehicle?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="type_oil" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Tipo de Aceite
        </label>
        <input
          type="text"
          id="type_oil"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Tipo de Aceite"
          {...register("type_oil", {
            required: "Debe indicar el tipo de aceite utilizado"
          })}
        />
      </div>
      {errors.type_oil && (
        <ErrorMessage>{errors.type_oil?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="brand_oil" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Marca del Aceite
        </label>
        <input
          type="text"
          id="brand_oil"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Marca del Aceite"
          {...register("brand_oil", {
            required: "Debe especificar la marca del aceite utilizado"
          })}
        />
      </div>
      {errors.brand_oil && (
        <ErrorMessage>{errors.brand_oil?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="filter" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Filtro de Aceite
        </label>
        <input
          type="text"
          id="filter"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Filtro de Aceite"
          {...register("filter", {
            required: "Debe suministrar el filtro usado para el servicio"
          })}
        />
      </div>
      {errors.filter && (
        <ErrorMessage>{errors.filter?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="mileage" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Kilometraje
        </label>
        <input
          type="text"
          id="mileage"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Kilometraje del vehículo"
          {...register("mileage", {
            required: "Indique el kilometraje actual del vehículo"
          })}
        />
      </div>
      {errors.mileage && (
        <ErrorMessage>{errors.mileage?.message}</ErrorMessage>
      )}
    </>
  );
}