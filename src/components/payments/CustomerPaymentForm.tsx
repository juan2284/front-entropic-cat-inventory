import { addNewCustomer } from "@/api/CustomersAPI";
import { Customer } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomerForm from "@/components/customers/CustomerForm";

export default function CustomerPaymentForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Customer>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNewCustomer,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success(data.msg);
    }
  });
  
  const handleForm = (formData: Customer) => {
    mutate(formData);
    reset();
  };
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
          >Registrar Cliente</button>
        </div>
      </form>
    </>
  );
}