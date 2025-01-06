import { addNewSupplier } from "@/api/SuppliersAPI";
import { ListActions } from "@/reducers/customerReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SupplierForm from "./SupplierForm";
import { Supplier } from "@/types/types";

type AddSupplierFormProps = {
  dispatch: Dispatch<ListActions>;
  isError: boolean;
};

export default function AddSupplierForm({dispatch, isError}: AddSupplierFormProps) {
  const { register, handleSubmit, reset, formState: {errors}} = useForm<Supplier>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNewSupplier,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['suppliers']});
      toast.success(data.msg);
    }
  });
  
  const handleForm = (data: Supplier) => {
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
          <SupplierForm register={register} errors={errors} />
        </div>

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Registrar Proveedor</button>

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