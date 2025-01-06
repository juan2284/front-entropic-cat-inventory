import { ListActions } from "@/reducers/customerReducer";
import { Supplier, Suppliers } from "@/types/types";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment } from "react";
import { useForm } from "react-hook-form";

type SelectFilterSuppliersModalProps = {
  state: {
    show: boolean;
  },
  suppliers: Suppliers;
  dispatch: Dispatch<ListActions>;
};

export default function SelectFilterSuppliersModal({state, suppliers, dispatch}: SelectFilterSuppliersModalProps) {
  const { register, handleSubmit, reset } = useForm<Supplier>();

  const handleForm = (data: Supplier) => {
    dispatch({ type: 'filter-suppliers', payload: { suppliers, filters: data } });
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
                  >Filtrar Proveedores por:</Dialog.Title>

                  <form
                    className="flex flex-col justify-center items-center p-3"
                    onSubmit={handleSubmit(handleForm)}
                  >
                    <div className="w-full text-center flex flex-row justify-between items-center gap-2">
                      <div>
                        <label htmlFor="name" className="flex flex-row justify-center items-center text-sm font-bold text-slate-700 gap-2 p-1">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Nombre"
                          {...register("name")}
                        />
                      </div>

                      <div>
                        <label htmlFor="last_name" className="flex flex-row justify-center items-center text-sm font-bold text-slate-700 gap-2 p-1">
                          Apellido
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Apellido"
                          {...register("last_name")}
                        />
                      </div>

                      <div>
                        <label htmlFor="identity_number" className="flex flex-row justify-center items-center text-sm font-bold text-slate-700 gap-2 p-1">
                          RIF
                        </label>
                        <input
                          type="text"
                          id="identity_number"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="RIF"
                          {...register("identity_number")}
                        />
                      </div>

                      <div>
                        <label htmlFor="telephone" className="flex flex-row justify-center items-center text-sm font-bold text-slate-700 gap-2 p-1">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          id="telephone"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Teléfono"
                          {...register("telephone")}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="flex flex-row justify-center items-center text-sm font-bold text-slate-700 gap-2 p-1">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Email"
                          {...register("email")}
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