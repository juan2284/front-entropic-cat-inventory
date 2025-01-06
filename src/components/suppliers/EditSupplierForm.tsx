import { editSupplier } from "@/api/SuppliersAPI";
import { ListActions } from "@/reducers/customerReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SupplierForm from "@/components/suppliers/SupplierForm";
import { Supplier } from "@/types/types";

type EditSupplierFormProps = {
  state: {
    supplierDetails: Supplier;
  };
  dispatch: Dispatch<ListActions>;
};

export default function EditSupplierForm({state, dispatch}: EditSupplierFormProps) {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Supplier>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editSupplier,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: Supplier) => {
    const supplierUpdate = {
      id: state.supplierDetails._id,
      supplier: data
    };

    mutate(supplierUpdate);
    reset();
    dispatch({ type: 'show-edit' });
  };

  useEffect(() => {
    setValue('name', state.supplierDetails.name);
    setValue('last_name', state.supplierDetails.last_name);
    setValue('identity_number', state.supplierDetails.identity_number);
    setValue('telephone', state.supplierDetails.telephone);
    setValue('email', state.supplierDetails.email);
  }, [state.supplierDetails]);
  return (
    <>
      <form
        className="w-2/3 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <SupplierForm register={register} errors={errors} />
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