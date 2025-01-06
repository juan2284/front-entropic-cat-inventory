import { AddChargeFormType } from "@/types/types";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import ErrorMessage from "../globals/ErrorMessage";
import { useSuppliers } from "@/hooks/suppliersHooks/useSuppliers";
import { useProducts } from "@/hooks/productsHooks/useProducts";
import { BanknotesIcon, CheckIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction } from "react";

type AddNewChargeFormProps ={
  register: UseFormRegister<AddChargeFormType>;
  errors: FieldErrors<AddChargeFormType>;
  getValues: UseFormGetValues<AddChargeFormType>;
  setValue: UseFormSetValue<AddChargeFormType>;
  setPending: Dispatch<SetStateAction<number>>;
  setSupplier: Dispatch<SetStateAction<string | undefined>>;
  setProduct: Dispatch<SetStateAction<string | undefined>>;
};

export default function AddNewChargeForm({register, errors, getValues, setValue, setPending, setSupplier, setProduct}: AddNewChargeFormProps) {
  const { suppliers } = useSuppliers();
  const { productsCodes } = useProducts();
  
  const handleSupplier = () => {
    setSupplier(getValues().supplier);
  };

  const handleProduct = () => {
    setProduct(getValues().product);
  };

  const handleCalc = () => {
    const pendingAmount = Number(getValues().total_amount) - (Number(getValues().amount_one) + Number(getValues().amount_three) + (Number(getValues().amount_two) * Number(getValues().currency_rate)));
    setPending(pendingAmount);
    setValue('pending_amount', pendingAmount);
  };

  return (
    <>
      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="supplier" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Proveedor
        </label>
        <select
          id="supplier"
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("supplier", {
            required: "Seleccione un proveedor"
          })}
        >
          <option value="">Seleccione</option>
          {suppliers.map(supplier => (
            <option value={supplier.id} key={supplier.id}>{supplier.supplier}</option>
          ))}
        </select>
        <button
          className="bg-green-600 hover:bg-green-700 rounded-sm p-1 transition-all ease-in-out duration-300"
          title="Verificar deudas con el proveedor"
          type="button"
          onClick={handleSupplier}
        >
          <CheckIcon className="text-white w-4" />
        </button>
      </div>
      {errors.supplier && (
        <ErrorMessage>{errors.supplier?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="product" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Producto
        </label>
        <select
          id="product"
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("product", {
            required: "Seleccione el Producto"
          })}
        >
          <option value="">Seleccione</option>
          {productsCodes.map(product => (
            <option value={product.id} key={product.id}>{product.product}</option>
          ))}
        </select>
        <button
          className="bg-green-600 hover:bg-green-700 rounded-sm p-1 transition-all ease-in-out duration-300"
          title="Revisar stock del Producto"
          type="button"
          onClick={handleProduct}
        >
          <CheckIcon className="text-white w-4" />
        </button>
      </div>
      {errors.product && (
        <ErrorMessage>{errors.product?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="quantity" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Cantidad
        </label>
        <input
          type="number"
          step='any'
          id="quantity"
          min={1}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Cantidad de Productos"
          {...register("quantity", {
            required: "Indique la cantidad de Productos que está comprando"
          })}
        />
      </div>
      {errors.quantity && (
        <ErrorMessage>{errors.quantity?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="total_amount" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Monto Total
        </label>
        <input
          type="number"
          step='any'
          id="total_amount"
          min={1}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Monto Total"
          {...register("total_amount", {
            required: "Indique el monto Pagado en Bs. Puede ser 0"
          })}
        />
      </div>
      {errors.total_amount && (
        <ErrorMessage>{errors.total_amount?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="amount_one" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Pago en Bs.
        </label>
        <input
          type="number"
          step='any'
          id="amount_one"
          min={0}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Pago en Bs."
          {...register("amount_one", {
            required: "Indique el monto Pagado en Bs. Puede ser 0"
          })}
        />
      </div>
      {errors.amount_one && (
        <ErrorMessage>{errors.amount_one?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="amount_two" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Pago en $
        </label>
        <input
          type="number"
          step='any'
          id="amount_two"
          min={0}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Pago en $"
          {...register("amount_two", {
            required: "Indique el monto Pagado en $. Puede ser 0"
          })}
        />
      </div>
      {errors.amount_two && (
        <ErrorMessage>{errors.amount_two?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="amount_three" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Pago con TDD/TDC
        </label>
        <input
          type="number"
          step='any'
          id="amount_three"
          min={0}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Pago con Tarjeta de Débito/Crédito"
          {...register("amount_three", {
            required: "Indique el monto Pagado con Tarjeta de Débito/Crédito. Puede ser 0"
          })}
        />
      </div>
      {errors.amount_three && (
        <ErrorMessage>{errors.amount_three?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="currency_rate" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Tasa de Cambio
        </label>
        <input
          type="number"
          step='any'
          id="currency_rate"
          min={0}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Tasa de Cambio"
          {...register("currency_rate", {
            required: "Indique la tasa de cálculo para las divisas entregadas"
          })}
        />

      </div>
      {errors.currency_rate && (
        <ErrorMessage>{errors.currency_rate?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="pending_amount" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Monto Pendiente
        </label>
        <input
          type="number"
          step='any'
          id="pending_amount"
          min={0}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Monto Pendiente"
          {...register("pending_amount")}
        />
        <button
          className="bg-green-600 hover:bg-green-700 rounded-sm p-1 transition-all ease-in-out duration-300" title="Calcular"
          type="button"
          onClick={handleCalc}
        >
          <BanknotesIcon className="text-white w-4" />
        </button>
      </div>
      {errors.pending_amount && (
        <ErrorMessage>{errors.pending_amount?.message}</ErrorMessage>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-2">
        <label htmlFor="price_one" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Precio en Bs.
        </label>
        <input
          type="number"
          step='any'
          id="price_one"
          min={1}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
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
        <label htmlFor="price_two" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
          Precio en $
        </label>
        <input
          type="number"
          step='any'
          id="price_two"
          min={1}
          className="w-4/6 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          placeholder="Indique un precio en $"
          {...register("price_two", {
            required: "El precio en $ no debe estar en blanco"
          })}
        />
      </div>
      {errors.price_two && (
        <ErrorMessage>{errors.price_two?.message}</ErrorMessage>
      )}
    </>
  );
}