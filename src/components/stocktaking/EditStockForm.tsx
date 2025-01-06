import { editStock } from "@/api/StocktakingsAPI";
import { ListActions } from "@/reducers/customerReducer";
import { StockFormType, Stocktaking } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import StockForm from "./StockForm";

type EditStockFormProps = {
  state: {
    stockDetails: Stocktaking;
  };
  dispatch: Dispatch<ListActions>;
};

export default function EditStockForm({state, dispatch}: EditStockFormProps) {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<StockFormType>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editStock,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stocktakings'] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: StockFormType) => {
    const stockUpdate = {
      id: state.stockDetails._id,
      stock: data
    };

    mutate(stockUpdate);
    reset();
    dispatch({ type: 'show-edit' });
  };

  useEffect(() => {
    setValue('price_one', state.stockDetails.price_one);
    setValue('price_two', state.stockDetails.price_two);
    setValue('stock_out', state.stockDetails.stock_out);
  }, [state.stockDetails]);
  return (
    <>
      <form
        className="w-2/3 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <StockForm register={register} errors={errors} />
        </div>

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Guardar Cambios</button>

          <button
            type="button"
            className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => dispatch({ type: 'show-edit' })}
          >Cancelar</button>
        </div>
      </form>
    </>
  );
}