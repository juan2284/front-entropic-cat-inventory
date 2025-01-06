import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../globals/ErrorMessage";
import { productCategories } from "@/utils/dictionaries";
import { categoriesTranslations } from "@/utils/es";
import { Product } from "@/types/types";

type ProductFormProps ={
  register: UseFormRegister<Product>;
  errors: FieldErrors<Product>;
};

export default function ProductForm({register, errors}: ProductFormProps) {
  const categories = Object.values(productCategories);
  return (
    <>
      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="code" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Código
        </label>
        <input
          type="text"
          id="code"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Código"
          {...register("code", {
            required: "El código del producto es obligatorio"
          })}
        />
      </div>
      {errors.code && (
        <ErrorMessage>{errors.code?.message}</ErrorMessage>
      )}

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
            required: "El nombre del producto es obligatorio"
          })}
        />
      </div>
      {errors.name && (
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="brand" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Marca
        </label>
        <input
          type="text"
          id="brand"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Marca"
          {...register("brand", {
            required: "Debe ingresar la marca del producto"
          })}
        />
      </div>
      {errors.brand && (
        <ErrorMessage>{errors.brand?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="type" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Tipo
        </label>
        <input
          type="text"
          id="type"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Tipo"
          {...register("type", {
            required: "Debe indicar el tipo de producto"
          })}
        />
      </div>
      {errors.type && (
        <ErrorMessage>{errors.type?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="description" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Descripción
        </label>
        <input
          type="text"
          id="description"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Descripción"
          {...register("description", {
            required: "Suministre una descripción del producto"
          })}
        />
      </div>
      {errors.description && (
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="category" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Categoría
        </label>
        <select
          id="category"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("category", {
            required: "Seleccione al menos una categoría válida"
          })}
        >
          <option value="">Seleccionar</option>
          {categories.map(category => (
            <option value={category} key={category}>{categoriesTranslations[category]}</option>
          ))}
        </select>
      </div>
      {errors.category && (
        <ErrorMessage>{errors.category?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="image" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
          Imagen (URL)
        </label>
        <input
          type="text"
          id="image"
          className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Imagen"
          {...register("image", {
            required: "Suministre una imagen para el producto"
          })}
        />
      </div>
      {errors.image && (
        <ErrorMessage>{errors.image?.message}</ErrorMessage>
      )}
    </>
  );
}