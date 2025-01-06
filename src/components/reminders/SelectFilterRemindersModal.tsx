import { ListActions } from "@/reducers/customerReducer";
import { Reminders, RemindersFilterView } from "@/types/types";
import { contactResultsTranslation } from "@/utils/es";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment } from "react";
import { useForm } from "react-hook-form";

type SelectFilterRemindersModalProps = {
  state: {
    show: boolean
  },
  reminders: Reminders;
  dispatch: Dispatch<ListActions>;
};

export default function SelectFilterRemindersModal({state, reminders, dispatch}: SelectFilterRemindersModalProps) {
  const { register, handleSubmit, reset } = useForm<RemindersFilterView>();
  const results = Object.keys(contactResultsTranslation);

  const handleForm = (data: RemindersFilterView) => {
    dispatch({ type: 'filter-reminders-view', payload: { reminders, filters: data } });
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
                <Dialog.Panel className="w-full rounded-sm transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all p-2">

                  <Dialog.Title
                    as="h3"
                    className="font-black text-2xl text-slate-700 my-2 text-center"
                  >Filtrar Recordatorios por:</Dialog.Title>

                  <form
                    className="w-full flex flex-col justify-center items-center p-3"
                    onSubmit={handleSubmit(handleForm)}
                  >
                    <div className="w-full text-center flex flex-row justify-between items-center gap-2">
                      <div className="w-full flex flex-col justify-center items-center">
                        <label htmlFor="identityNumber" className="w-full text-sm font-bold text-slate-700 gap-2 p-1">
                          Cédula del Cliente
                        </label>
                        <input
                          type="text"
                          id="identityNumber"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Cédula"
                          {...register("identityNumber")}
                        />
                      </div>

                      <div className="w-full flex flex-col justify-center items-center">
                        <label htmlFor="payment" className="w-full text-sm font-bold text-slate-700 gap-2 p-1">
                          ID de la Transacción
                        </label>
                        <input
                          type="text"
                          id="payment"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Id de la Transacción"
                          {...register("payment")}
                        />
                      </div>

                      <div className="w-full flex flex-col justify-center items-center">
                        <label htmlFor="contact" className="w-full text-sm font-bold text-slate-700 gap-2 p-1">
                          Estatus del Recordatorio
                        </label>
                        <select
                          id="contact"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          {...register("contact")}
                        >
                          <option value={''}>Seleccione</option>
                          {results.map(result => (
                            <option value={result} key={result}>{contactResultsTranslation[result]}</option>
                          ))}
                        </select>
                      </div>

                      <div className="w-full flex flex-col justify-center items-center">
                        <label htmlFor="service_date" className="w-full text-sm font-bold text-slate-700 gap-2 p-1">
                          Fecha del Servicio
                        </label>
                        <input
                          type="date"
                          id="service_date"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Fecha del Servicio"
                          {...register("service_date")}
                        />
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
                      >Close</button>
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