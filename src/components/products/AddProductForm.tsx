import { ListActions } from "@/reducers/customerReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addNewProduct } from "@/api/ProductsAPI";
import ProductForm from "@/components/products/ProductForm";
import { Product } from "@/types/types";

type AddProductFormProps = {
  dispatch: Dispatch<ListActions>;
  isError: boolean;
};

export default function AddProductForm({dispatch, isError}: AddProductFormProps) {
  const { register, handleSubmit, reset, formState: {errors}} = useForm<Product>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNewProduct,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['products']});
      toast.success(data.msg);
    }
  });
 
  const handleForm = (data: Product) => {
    mutate(data);
    reset();
    dispatch({type: 'show-add'});
  };
  return (
    <>
      <form
        className="w-2/3 p-3 mx-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <ProductForm register={register} errors={errors} />
        </div>

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Registrar Producto</button>

          {isError ? (
            null
          ) : (
            <button
              type="button"
              className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
              onClick={() => dispatch({ type: 'show-add' })}
            >Cancelar</button>
          )}
        </div>
      </form>
    </>
  );
}