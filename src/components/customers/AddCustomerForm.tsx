import { Dispatch } from "react";
import { ListActions } from "@/reducers/customerReducer";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCustomer } from "@/api/CustomersAPI";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomerForm from "@/components/customers/CustomerForm";
import { Customer } from "@/types/types";

type AddCustomerFormProps = {
  dispatch: Dispatch<ListActions>;
  isError: boolean;
};

export default function AddCustomerForm({dispatch, isError}: AddCustomerFormProps) {
  const { register, handleSubmit, reset, formState: {errors}} = useForm<Customer>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNewCustomer,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['customers']});
      toast.success(data.msg);
    }
  });
  
  const handleForm = (data: Customer) => {
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
          <CustomerForm register={register} errors={errors} />          
        </div>

        <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Registrar Cliente</button>

          {isError ? (
            null
          ) : (
            <button
              type="button"
              className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
              onClick={() => dispatch({ type: 'show-add' })}
            >Close</button>
          )}
        </div>
      </form>
    </>
  );
}