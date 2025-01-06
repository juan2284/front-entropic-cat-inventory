import { editCustomer } from "@/api/CustomersAPI";
import { ListActions } from "@/reducers/customerReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomerForm from "@/components/customers/CustomerForm";
import { Customer } from "@/types/types";

type EditCustomerFormProps = {
  state: {
    customerDetails: Customer;
  };
  dispatch: Dispatch<ListActions>;
};

export default function EditCustomerForm({state, dispatch}: EditCustomerFormProps) {
  const { register, handleSubmit, setValue, reset, formState: {errors}} = useForm<Customer>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editCustomer,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['customers']});
      toast.success(data.msg);
    }
  });

  const handleForm = (data: Customer) => {
    const customerUpdate = {
      id: state.customerDetails._id,
      customer: data
    };

    mutate(customerUpdate);
    reset();
    dispatch({type: 'show-edit'});
  };

  useEffect(() => {
    setValue('name', state.customerDetails.name);
    setValue('last_name', state.customerDetails.last_name);
    setValue('identity_number', state.customerDetails.identity_number);
    setValue('telephone', state.customerDetails.telephone);
    setValue('email', state.customerDetails.email);
  }, [state.customerDetails]);
  return (
    <>
      <form
        className="w-2/3 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <CustomerForm register={register} errors={errors} />
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
  )
}