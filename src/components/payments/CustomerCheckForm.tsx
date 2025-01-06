import { Customer } from "@/types/types";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/globals/ErrorMessage";
import { Dispatch, SetStateAction } from "react";
import { useCustomers } from "@/hooks/customersHooks/useCustomers";
import { toast } from "react-toastify";

type CustomerCheckFormProps ={
  customer: Customer;
  setCustomer: Dispatch<SetStateAction<Customer | undefined>>;
};

export default function CustomerCheckForm({customer, setCustomer}: CustomerCheckFormProps) {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<Customer>();
  const { data } = useCustomers();
  const handleCustomer = () => {
    const customerSearched = data?.filter(customerSearch => customerSearch.identity_number === getValues().identity_number || customerSearch.telephone === getValues().identity_number )[0];
    if (!customerSearched) {
      toast.error('El cliente no está registrado');
    }
    setCustomer(customerSearched);
  };
  return (
    <>
      <h5 className="w-full text-lg text-center font-oswald text-gray-500 mt-4">Cliente</h5>

      <form
        className="w-4/5 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleCustomer)}
      >
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <label htmlFor="identity_number" className="w-3/12 text-sm font-bold text-slate-700 gap-2 p-1">
            Cédula o Teléfono
          </label>
          <input
            type="text"
            id="identity_number"
            className="w-9/12 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Cédula o Teléfono"
            {...register("identity_number", {
              required: "Debe indicar el número de cédula del cliente"
            })}
          />
        </div>
        {errors.identity_number && (
          <ErrorMessage>{errors.identity_number?.message}</ErrorMessage>
        )}

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-2">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Revisar Cliente</button>
        </div>

        {customer && (
          <>
            <p className="font-roboto text-xs text-center text-gray-600 mt-2">{customer.identity_number} - {customer.name} {customer.last_name}</p>
          </>
        )}

      </form>
    </>
  );
}