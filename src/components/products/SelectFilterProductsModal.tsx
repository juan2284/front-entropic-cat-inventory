import { ListActions } from "@/reducers/customerReducer";
import { Product, Products } from "@/types/types";
import { productCategories } from "@/utils/dictionaries";
import { categoriesTranslations } from "@/utils/es";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment } from "react";
import { useForm } from "react-hook-form";

type SelectFilterProductsModalProps = {
  state: {
    show: boolean
  },
  products: Products;
  dispatch: Dispatch<ListActions>;
};

export default function SelectFilterProductsModal({state, products, dispatch}: SelectFilterProductsModalProps) {
  const { register, handleSubmit, reset} = useForm<Product>();
  const categories = Object.values(productCategories);

  const handleForm = (data: Product) => {
    dispatch({type: 'filter-products', payload: {products, filters: data}});
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
                  >Filtrar Clientes por:</Dialog.Title>

                  <form
                    className="w-full flex flex-col justify-center items-center p-3"
                    onSubmit={handleSubmit(handleForm)}
                  >
                    <div className="w-full text-center flex flex-row justify-between items-center gap-2">
                      <div>
                        <label htmlFor="code" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Código
                        </label>
                        <input
                          type="text"
                          id="code"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Código"
                          {...register("code")}
                        />
                      </div>

                      <div>
                        <label htmlFor="name" className="text-sm font-bold text-slate-700 gap-2 p-1">
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
                        <label htmlFor="brand" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Marca
                        </label>
                        <input
                          type="text"
                          id="brand"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Marca"
                          {...register("brand")}
                        />
                      </div>

                      <div>
                        <label htmlFor="type" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Tipo
                        </label>
                        <input
                          type="text"
                          id="type"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Tipo"
                          {...register("type")}
                        />
                      </div>

                      <div>
                        <label htmlFor="description" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Descripción
                        </label>
                        <input
                          type="text"
                          id="description"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          placeholder="Descripción"
                          {...register("description")}
                        />
                      </div>

                      <div>
                        <label htmlFor="category" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Categoría
                        </label>
                        <select
                          id="category"
                          className="border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          {...register("category")}
                        >
                          {categories.map(category => (
                            <option value={category} key={category}>{categoriesTranslations[category]}</option>
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