import { deleteProduct } from "@/api/ProductsAPI";
import { ListActions } from "@/reducers/customerReducer";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, Fragment } from "react";
import { toast } from "react-toastify";
import ProductsTable from "./ProductsTable";
import { Product, Products } from "@/types/types";

type DeleteProductModalProps = {
  state: {
    viewEditCustomer: boolean;
    viewDetailsCustomer: boolean;
    viewDeleteCustomer: boolean;
    productDetails: Product;
    searchProduct: Products;
  },
  dispatch: Dispatch<ListActions>;
};

export default function DeleteProductModal({state, dispatch}: DeleteProductModalProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['products']});
      toast.success(data.msg);
    }
  });

  const handleDelete = () => {
    mutate(state.productDetails._id);
    dispatch({type: 'show-delete'});
  };

  return (
    <>
      <Transition appear show={state.viewDeleteCustomer} as={Fragment}>
        <Dialog as="div" className="relative z-50 w-auto" onClose={() => dispatch({ type: 'show-delete' })}>
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
                  >Eliminar Cliente</Dialog.Title>

                  <h4 className="text-center">Por favor, confirme si desea eliminar este Producto:</h4>

                  <ProductsTable state={state!} products={[state.productDetails]} dispatch={dispatch} />

                  <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-4">
                    <button
                      type="button"
                      className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
                      onClick={handleDelete}
                    >Eliminar</button>

                    <button
                      type="button"
                      className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
                      onClick={() => dispatch({ type: 'show-delete' })}
                    >Cancelar</button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}