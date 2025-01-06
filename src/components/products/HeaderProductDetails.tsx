import { useStocksByProduct } from "@/hooks/productsHooks/useStocksByProduct";
import { progressBarOptions } from "@/utils/dictionaries";
import { Product } from "@/types/types";
import Loader from "../globals/Loader";

type HeaderProductDetailsProps = {
  productId: Product['_id'];
};

export default function HeaderProductDetails({productId}: HeaderProductDetailsProps) {
  const { data, isLoading, isError, globalStock, stockBar, globalQuantity, sales, partialStock, widthClassStockBar } = useStocksByProduct(productId);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <section className="flex flex-row flex-wrap justify-start items-center">

        <article className="w-1/2 flex flex-col justify-center items-start font-roboto border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Existencia</h4>
          <h5 className="w-full text-4xl text-center font-bold text-indigo-600">{globalStock}</h5>
          <article className="w-full flex flex-col justify-center items-center font-roboto px-2 gap-2">
            <div className="w-full h-2 bg-gray-200 rounded-full relative">
              <div className={`h-full absolute rounded-full ${stockBar >= 50 ? progressBarOptions.high : stockBar < 50 && stockBar >= 15 ? progressBarOptions.medium : progressBarOptions.low}`} style={{ width: `${widthClassStockBar}` }}></div>
            </div>
            <div className={`text-xs font-bold ${stockBar >= 50 ? 'text-teal-500' : stockBar < 50 && stockBar >= 15 ? 'text-amber-500' : 'text-red-600'}`}>{stockBar}%</div>
          </article>
        </article>

        <article className="w-1/2 flex flex-row justify-center items-start font-roboto p-2 gap-[0.125rem]">
          <p className="text-left text-xs font-light bg-indigo-200 py-1 px-3 rounded-[2px]">Inventario General: <span className="text-indigo-600 font-bold">{globalQuantity}</span></p>
          <p className="text-left text-xs font-light bg-indigo-200 py-1 px-3 rounded-[2px]">Ventas Generales: <span className="text-indigo-600 font-bold">{sales}</span></p>
          <p className="text-left text-xs font-light bg-indigo-200 py-1 px-3 rounded-[2px]">Inventarios Parciales: <span className="text-indigo-600 font-bold">{partialStock}</span></p>
        </article>
      </section>
    </>
  );
}