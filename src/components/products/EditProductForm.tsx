import { editProduct } from "@/api/ProductsAPI";
import { ListActions } from "@/reducers/customerReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProductForm from "@/components/products/ProductForm";
import { Product } from "@/types/types";

type EditProductFormProps = {
  state: {
    productDetails: Product;
  };
  dispatch: Dispatch<ListActions>;
};

export default function EditProductForm({state, dispatch}: EditProductFormProps) {
  const { register, handleSubmit, setValue, reset, formState: {errors}} = useForm<Product>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editProduct,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['products']});
      toast.success(data.msg);
    }
  });

  const handleForm = (data: Product) => {
    const productUpdate = {
      id: state.productDetails._id,
      product: data
    };

    mutate(productUpdate);
    reset();
    dispatch({type: 'show-edit'});
  };

  useEffect(() => {
    setValue('code', state.productDetails.code);
    setValue('name', state.productDetails.name);
    setValue('brand', state.productDetails.brand);
    setValue('type', state.productDetails.type);
    setValue('description', state.productDetails.description);
    setValue('category', state.productDetails.category);
    setValue('image', state.productDetails.image);
  }, [state.productDetails]);
  return (
    <>
      <form
        className="w-2/3 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <ProductForm register={register} errors={errors} />
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