import { ListActions } from "@/reducers/customerReducer";
import { Payments, PaymentsFilterView } from "@/types/types";
import { paymentStatus } from "@/utils/dictionaries";
import { paidStatusTranslations } from "@/utils/es";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

type SelectFilterPaymentsModalProps = {
  state: {
    show: boolean;
  },
  payments: Payments;
  dispatch: Dispatch<ListActions>;
};

export default function SelectFilterPaymentsModal({state, payments, dispatch}: SelectFilterPaymentsModalProps) {
  const { register, handleSubmit, reset } = useForm<PaymentsFilterView>();
  const payStatus = paymentStatus;

  const handleForm = (data: PaymentsFilterView) => {
    dispatch({ type: 'filter-payments-view', payload: { payments, filters: data } });
    reset();
  };
  return (
    <>
      <Transition appear show={state.show} as={Fragment}>
        <Dialog as="div" className="relative z-50 w-auto" onClose={() => dispatch({ type: 'show-modal' })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="w-auto fixed inset-0 font-roboto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full rounded-sm max-w-4xl transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all p-2">

                  <Dialog.Title
                    as="h3"
                    className="font-black text-2xl text-slate-700 my-2 text-center"
                  >Filtrar Pagos por:</Dialog.Title>

                  <form
                    className="flex flex-col justify-center items-center p-3"
                    onSubmit={handleSubmit(handleForm)}
                  >
                    <div className="w-full text-center flex flex-row justify-between items-center gap-2">
                      <div className="w-full">
                        <label htmlFor="name" className="flex flex-row justify-center items-center text-sm font-bold text-slate-700 gap-2 p-1">
                          Número de Identificación
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Número de Identificación"
                          {...register("identityNumber")}
                        />
                      </div>

                      <div className="w-full">
                        <label htmlFor="paymentStatus" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Estatus de Pago
                        </label>
                        <select
                          id="paymentStatus"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          defaultValue={''}
                          {...register("paymentStatus")}
                        >
                          <option value={''}>Seleccione</option>
                          {payStatus.map(status => (
                            <option value={status} key={status}>{paidStatusTranslations[status]}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
                        onClick={() => dispatch({ type: 'show-modal' })}
                      >Filtrar</button>

                      <button
                        type="button"
                        className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
                        onClick={() => dispatch({ type: 'show-modal' })}
                      >Cancelar</button>
                    </div>
                  </form>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}