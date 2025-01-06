import { useProducts } from "@/hooks/productsHooks/useProducts";
import StockBar from "@/components/products/StockBar";
import CategoriesBar from "@/components/products/CategoriesBar";
import Loader from "../globals/Loader";

export default function HeaderProducts() {
  const { data, isLoading, isError, globalStocksByCategories, stockAllProducts, statusStock } = useProducts();

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <section className="flex flex-row flex-wrap justify-start items-center border-b border-b-gray-200">
        <article className=" w-1/6 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Existencia General</h4>
          <h5 className="w-full text-4xl text-center font-bold text-indigo-600">{stockAllProducts}</h5>
          <h5 className="w-full text-xs text-center font-bold">Unidades</h5>
        </article>

        <article className=" w-1/3 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <StockBar data={statusStock} />
        </article>

        <article className=" w-3/6 flex flex-col justify-center items-start font-roboto p-2">
          <CategoriesBar data={globalStocksByCategories} />
        </article>
      </section>
    </>
  );
}