import { editCharge } from "@/api/ChargesAPI";
import { ListActions } from "@/reducers/customerReducer";
import { AddChargeFormType, Charge, Product, Supplier } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddNewChargeForm from "./AddNewChargeForm";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import ChargesDetailsAdd from "./ChargesDetailsAdd";
import StocksDetailsAdd from "./StocksDetailsAdd";
import { paidStatusTranslations } from "@/utils/es";

type EditChargesFormProps = {
  state: {
    chargeDetails: Charge;
    viewEditCustomer: boolean;
  };
  dispatch: Dispatch<ListActions>;
};

export default function EditChargesForm({state, dispatch}: EditChargesFormProps) {
  const { register, handleSubmit, reset, formState: {errors}, getValues, setValue} = useForm<AddChargeFormType>();
  const [ pending, setPending ] = useState(0);
  const [ supplier, setSupplier] = useState<Supplier['_id']>();
  const [ product, setProduct] = useState<Product['_id']>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editCharge,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['charges'] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: AddChargeFormType) => {
    const chargeUpdate = {
      id: state.chargeDetails._id,
      charge: data
    };

    mutate(chargeUpdate);
    reset();
    dispatch({ type: 'show-edit' });
  };

  useEffect(() => {
    setValue('total_amount', state.chargeDetails.total_amount);
    setValue('amount_one', state.chargeDetails.amount_one);
    setValue('amount_two', state.chargeDetails.amount_two);
    setValue('amount_three', state.chargeDetails.amount_three);
    setValue('currency_rate', state.chargeDetails.currency_rate);
    setValue('pending_amount', state.chargeDetails.pending_amount);
    setValue('quantity', state.chargeDetails.product.quantity);
  }, [state.chargeDetails]);
  return (
    <>
      <form
        className="w-2/3 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <h5 className="font-roboto text-md font-bold text-center text-gray-600 border-b border-b-gray-200 mb-2">Pago: #{state.chargeDetails._id.slice(-5)} - <span className={`${state.chargeDetails.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{paidStatusTranslations[state.chargeDetails.status]}</span></h5>

        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <AddNewChargeForm register={register} errors={errors} setPending={setPending} getValues={getValues} setValue={setValue} setSupplier={setSupplier!} setProduct={setProduct!} />
        </div>

        {pending !== 0 && !state.viewEditCustomer ? (
          <div className="flex flex-row justify-center items-center font-roboto p-2 mt-2">
            <h4 className="w-full text-xs text-center font-light text-gray-500">Monto Pendiente:</h4>
            <h5 className="w-full text-sm text-center font-bold text-red-600">{formatCurrencyLocal(pending)}</h5>
          </div>
        ) : null}

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Guardar Cambios</button>

          <button
            type="button"
            className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => dispatch({ type: 'show-edit' })}
          >Close</button>
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