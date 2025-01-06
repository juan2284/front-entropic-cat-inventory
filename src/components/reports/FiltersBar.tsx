import { CustomerReportFilters } from "@/types/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "@/components/globals/ErrorMessage";

type ProductFormProps ={
  register: UseFormRegister<CustomerReportFilters>;
  errors: FieldErrors<CustomerReportFilters>;
};

export default function FiltersBar({register, errors}: ProductFormProps) {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <label htmlFor="startDate" className="w-full text-sm font-bold text-slate-700 gap-2 p-1">
          Fecha de Inicio
        </label>
        <input
          type="date"
          id="startDate"
          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("startDate", {
            required: "Debes suministrar una Fecha de Inicio"
          })}
        />
        {errors.startDate && (
          <ErrorMessage>{errors.startDate?.message}</ErrorMessage>
        )}
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <label htmlFor="endDate" className="w-full text-sm font-bold text-slate-700 gap-2 p-1">
          Fecha Fin
        </label>
        <input
          type="date"
          id="endDate"
          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("endDate", {
            required: "Debes suministrar una Fecha de Fin"
          })}
        />
        {errors.endDate && (
          <ErrorMessage>{errors.endDate?.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}