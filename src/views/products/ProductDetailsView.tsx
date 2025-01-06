import Loader from "@/components/globals/Loader";
import HeaderProductDetails from "@/components/products/HeaderProductDetails";
import PartialStocks from "@/components/products/PartialStocks";
import ProductImage from "@/components/products/ProductImage";
import ProductsTable from "@/components/products/ProductsTable";
import { useProductById } from "@/hooks/productsHooks/useProductById";
import { ListActions } from "@/reducers/customerReducer";
import { Product, Products } from "@/types/types";
import { CubeIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { Link, useParams } from "react-router-dom";

type ProductDetailsViewProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    searchProduct: Products;
    productDetails: Product;
    stocksFilter: string;
  },
  dispatch: Dispatch<ListActions>;
};

export default function ProductDetailsView({state, dispatch}: ProductDetailsViewProps) {
  const params = useParams();
  const productId: Product['_id'] = state.productDetails._id ? state.productDetails._id : params.productId!;
  const { data, isLoading, isError } = useProductById(productId);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <section className="p-4">
        <div className="w-full flex md:flex-row justify-center items-center gap-2 mb-4">
          <Link
            to={'/productos'}
            className="w-1/5 bg-indigo-600 text-xs font-roboto text-center hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
            onClick={() => {dispatch({type: 'show-details', payload: {result: false}}); dispatch({type: 'clear-states'})}}
          >Regresar</Link>
          <h3
            className="w-4/5 font-black text-2xl text-slate-700 my-2 text-center flex flex-row justify-center items-center gap-2"
          >{data?.name} <CubeIcon className="w-6 h-6 text-indigo-600" /></h3>
        </div>

        <article className="px-2 pt-2 border-t border-t-gray-200 mt-4">
          <HeaderProductDetails productId={data?._id} />
        </article>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <h4 className="text-center text-gray-600 text-xl font-oswald group-hover:text-indigo-600">Detalles del Producto</h4>
          <ProductsTable state={state!} products={[data!]} dispatch={dispatch} />
        </article>

        <article className="p-2 border border-gray-200 rounded-sm mt-4">
          <PartialStocks state={state!} dispatch={dispatch} />
        </article>
        
        <article className="px-2 pt-2 border-t border-t-gray-200 mt-4">
          <ProductImage state={state!} />
        </article>

      </section>
    </>
  );
}