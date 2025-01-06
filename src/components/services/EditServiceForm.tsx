import { ListActions } from "@/reducers/customerReducer";
import { Service, ServiceFormType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ServiceForm from "@/components/services/ServiceForm";
import { editService } from "@/api/ServicesAPI";

type EditServiceFormProps = {
  state: {
    serviceDetails: Service;
  };
  dispatch: Dispatch<ListActions>;
};

export default function EditServiceForm({state, dispatch}: EditServiceFormProps) {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ServiceFormType>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editService,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: ServiceFormType) => {
    const serviceUpdate = {
      id: state.serviceDetails._id,
      service: data
    };

    mutate(serviceUpdate);
    reset();
    dispatch({ type: 'show-edit' });
  };

  useEffect(() => {
    setValue('vehicle', state.serviceDetails.vehicle);
    setValue('brand_oil', state.serviceDetails.brand_oil);
    setValue('type_oil', state.serviceDetails.type_oil);
    setValue('filter', state.serviceDetails.filter);
    setValue('mileage', state.serviceDetails.mileage);
  }, [state.serviceDetails]);
  return (
    <>
      <form
        className="w-2/3 p-3 m-auto font-roboto"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="w-full text-center flex flex-col justify-between items-center gap-2">
          <ServiceForm register={register} errors={errors} />
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