import { Fragment } from "react/jsx-runtime";
import { Dialog, Transition } from "@headlessui/react";
import { StocksFilterView, Stocktakings } from "@/types/types";
import { Dispatch } from "react";
import { ListActions } from "@/reducers/customerReducer";
import { useForm } from "react-hook-form";
import { useSuppliers } from "@/hooks/suppliersHooks/useSuppliers";
import { paymentStatus, stocksStatus } from "@/utils/dictionaries";
import { useProducts } from "@/hooks/productsHooks/useProducts";
import { paidStatusTranslations, statusStockTranslations } from "@/utils/es";

type SelectFilterStocksModalProps = {
  state: {
    show: boolean
  },
  stocks: Stocktakings;
  dispatch: Dispatch<ListActions>;
};

export default function SelectFilterStocksModal({state, stocks, dispatch}: SelectFilterStocksModalProps) {
  const { register, handleSubmit, reset } = useForm<StocksFilterView>();
  const { suppliers } = useSuppliers();
  const { productsCodes } = useProducts();
  const payStatus = paymentStatus;
  const productsStatus = stocksStatus;

  const handleForm = (data: StocksFilterView) => {
    dispatch({ type: 'filter-stocks-view', payload: { stocks, filters: data } });
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
                  >Filtrar Inventarios por:</Dialog.Title>

                  <form
                    className="w-full flex flex-col justify-center items-center p-3"
                    onSubmit={handleSubmit(handleForm)}
                  >
                    <div className="w-full text-center flex flex-row justify-between items-center gap-2">
                      <div className="w-full">
                        <label htmlFor="supplier" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Proveedor
                        </label>
                        <select
                          id="supplier"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          defaultValue={''}
                          {...register("supplier")}
                        >
                          <option value={''}>Seleccione</option>
                          {suppliers.map(supplier => (
                            <option value={supplier.supplier} key={supplier.id}>{supplier.supplier}</option>
                          ))}
                        </select>
                      </div>

                      <div className="w-full">
                        <label htmlFor="productCode" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Producto
                        </label>
                        <select
                          id="productCode"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          defaultValue={''}
                          {...register("productCode")}
                        >
                          <option value={''}>Seleccione</option>
                          {productsCodes.map(product => (
                            <option value={product.product} key={product.id}>{product.product}</option>
                          ))}
                        </select>
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

                      <div className="w-full">
                        <label htmlFor="stockStatus" className="text-sm font-bold text-slate-700 gap-2 p-1">
                          Estatus del Inventario
                        </label>
                        <select
                          id="stockStatus"
                          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
                          defaultValue={''}
                          {...register("stockStatus")}
                        >
                          <option value={''}>Seleccione</option>
                          {productsStatus.map(status => (
                            <option value={status} key={status}>{statusStockTranslations[status]}</option>
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