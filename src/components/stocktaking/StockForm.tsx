import { StockFormType } from "@/types/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../globals/ErrorMessage";

type StockFormProps ={
  register: UseFormRegister<StockFormType>;
  errors: FieldErrors<StockFormType>;
};

export default function StockForm({register, errors}: StockFormProps) {
  return (
    <>
      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="price_one" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Precio en Bs.
        </label>
        <input
          type="text"
          id="price_one"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Indique un precio en Bs."
          {...register("price_one", {
            required: "El precio en Bs. no debe estar en blanco"
          })}
        />
      </div>
      {errors.price_one && (
        <ErrorMessage>{errors.price_one?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="price_two" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Precio en $
        </label>
        <input
          type="text"
          id="price_two"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Indique un precio en $"
          {...register("price_two", {
            required: "El precio en $ no debe estar en blanco"
          })}
        />
      </div>
      {errors.price_two && (
        <ErrorMessage>{errors.price_two?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="stock_out" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Estatus del Inventario
        </label>
        <select
          id="stock_out"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("stock_out", {
            required: "Seleccione una opción para activar o desactivar el inventario"
          })}
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      {errors.stock_out && (
        <ErrorMessage>{errors.stock_out?.message}</ErrorMessage>
      )}
    </>
  );
}