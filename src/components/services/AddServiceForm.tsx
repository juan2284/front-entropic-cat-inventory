import { addNewService } from "@/api/ServicesAPI";
import { Customer, ServiceFormType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ServiceForm from "@/components/services/ServiceForm";
import { usePayments } from "@/hooks/paymentsHooks/usePayments";
import { useNavigate } from "react-router-dom";

export default function AddServiceForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ServiceFormType>();
  const { data } = usePayments();
  const [customer, setCustomer] = useState<Customer>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNewService,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: ServiceFormType) => {
    mutate(data);
    setCustomer(undefined);
    reset();
    navigate('/servicios');
  };

  const handlePaymentId = (e: ChangeEvent<HTMLInputElement>) => {
    const paymentSearched = e.target.value.replace('#', ''); 
    const paymentExist = data?.filter(payment => payment._id.slice(-5) === paymentSearched);
    if (paymentExist?.length !== 0) {
      paymentExist?.map(payment => {
        setCustomer(payment.customer);
        setValue('customer', payment.customer._id);
        setValue('payment', payment._id);
      });
    } else {
      setCustomer(undefined);
    }
  };

  const handleReset = () => {
    setCustomer(undefined);
    reset();
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-2/3 flex flex-row justify-center items-center gap-2">
          <label htmlFor="paymentId" className="w-1/5 text-sm font-bold text-slate-700 gap-2 p-1">
            ID del Cobro
          </label>
          <input
            type="text"
            id="paymentId"
            className="w-4/5 border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="ID del Cobro"
            onChange={handlePaymentId}
          />
        </div>
      </div>

      <form
        className="w-2/3 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >

        {customer ? (
          <>
            <p className="font-roboto text-xs text-center text-gray-600 mb-2">{customer.identity_number} - {customer.name} {customer.last_name}</p>

            <div className="w-full text-center flex flex-col justify-between items-center gap-2">
              <ServiceForm register={register} errors={errors} />
            </div>

            <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
              <button
                type="submit"
                className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
              >Registrar Servicio</button>

              <button
                type="button"
                className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
                onClick={handleReset}
              >Resetear</button>
            </div>
          </>
        ) : (
          <p className="font-roboto text-xs text-center text-gray-600 my-2">No existe Cobro con este ID</p>
        )}

      </form>
    </>
  );
}