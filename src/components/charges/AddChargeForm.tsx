import { addNewCharge } from "@/api/ChargesAPI";
import { AddChargeFormType, Product, Supplier } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddNewChargeForm from "@/components/charges/AddNewChargeForm";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import ChargesDetailsAdd from "@/components/charges/ChargesDetailsAdd";
import StocksDetailsAdd from "./StocksDetailsAdd";
import { useNavigate } from "react-router-dom";

export default function AddChargeForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: {errors}, getValues, setValue} = useForm<AddChargeFormType>();
  const [ pending, setPending ] = useState(0);
  const [ supplier, setSupplier] = useState<Supplier['_id']>();
  const [ product, setProduct] = useState<Product['_id']>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNewCharge,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['charges']});
      toast.success(data.msg);
    }
  });
 
  const handleForm = (data: AddChargeFormType) => {
    mutate(data);
    reset();
    navigate('/pagos');
  };
  return (
    <>
      <form
        className="w-4/5 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <AddNewChargeForm register={register} errors={errors} setPending={setPending} getValues={getValues} setValue={setValue} setSupplier={setSupplier!} setProduct={setProduct!} />
        </div>

        {pending !== 0 && (
          <div className="flex flex-row justify-center items-center font-roboto p-2 mt-2">
            <h4 className="w-full text-xs text-center font-light text-gray-500">Monto Pendiente:</h4>
            <h5 className="w-full text-sm text-center font-bold text-red-600">{formatCurrencyLocal(pending)}</h5>
          </div>
        )}

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-2">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Registrar Pago</button>

          <button
            type="button"
            className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => {reset(); setPending(0); setSupplier(''); setProduct('')}}
          >Resetear</button>
        </div>

        {supplier && (
          <>
            <h4 className="w-full text-md text-center font-oswald text-gray-500 mt-4">Deudas Pendientes:</h4>
            <ChargesDetailsAdd supplier={supplier} />          
          </>
        )}

        {product && (
          <>
            <h4 className="w-full text-md text-center font-oswald text-gray-500 mt-4">Inventarios del Producto:</h4>
            <StocksDetailsAdd product={product!} />
          </>
        )}
      </form>
    </>
  );
}