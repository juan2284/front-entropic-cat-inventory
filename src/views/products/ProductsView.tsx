import Loader from "@/components/globals/Loader";
import Logo from "@/components/globals/Logo";
import PaginationReports from "@/components/globals/PaginationReports";
import AddProductForm from "@/components/products/AddProductForm";
import DeleteProductModal from "@/components/products/DeleteProductModal";
import EditProductForm from "@/components/products/EditProductForm";
import HeaderProducts from "@/components/products/HeaderProducts";
import ProductsTable from "@/components/products/ProductsTable";
import SearchProduct from "@/components/products/SearchProduct";
import SelectFilterProductsModal from "@/components/products/SelectFilterProductsModal";
import { useProducts } from "@/hooks/productsHooks/useProducts";
import { ListActions } from "@/reducers/customerReducer";
import { Product, Products } from "@/types/types";
import { FunnelIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";

type ProductsViewProps = {
  state: {
    show: boolean;
    products: Products;
    searchProduct: Products;
    viewAddCustomer: boolean;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    productDetails: Product;
  },
  dispatch: Dispatch<ListActions>;
};

export default function ProductsView({state, dispatch}: ProductsViewProps) {
  const { data, isLoading, isError, paginationData, products } = useProducts();
  const productsPaginated = state?.products.length !== 0 ? state?.products : products;

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Productos Registrados</h4>

      <AddProductForm dispatch={dispatch} isError={isError} />
    </div>
  );
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <header>
        <SearchProduct products={data} dispatch={dispatch} />
        <HeaderProducts />
      </header>

      <main className="p-4">
        {state?.viewAddCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Agregar Nuevo Producto:</h4>
              <AddProductForm dispatch={dispatch} isError={isError} />
            </article>
          </section>
        )}

        {state?.viewEditCustomer && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Editar Producto:</h4>
              <EditProductForm state={state} dispatch={dispatch} />
            </article>
          </section>
        )}

        {state?.searchProduct && state.searchProduct.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <ProductsTable state={state!} products={state.searchProduct} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Todos los Productos</h4>

              <div className="flex flex-row justify-center items-center gap-2">
                <XMarkIcon
                  className={`${state?.products.length !== 0 ? '' : 'hidden'} w-3 h-3 hover:text-indigo-500 cursor-pointer transition-all ease-in-out duration-300`}
                  title="Eliminar Filtros"
                  onClick={() => dispatch({ type: 'clear-filters' })}
                />
                <button
                  className="flex flex-row justify-between items-center gap-1 p-2 bg-gray-200 text-gray-600 rounded-sm font-semibold font-roboto text-xs hover:bg-gray-300 transition-all ease-in-out duration-300 relative"
                  onClick={() => dispatch({ type: 'show-modal' })}
                  title="Filtrar Clientes"
                >
                  <div className={`${state?.products.length !== 0 ? '' : 'hidden'} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
                  <FunnelIcon className="w-3 h-3" />
                  Filtros
                </button>
                <button
                  className={`${state?.viewAddCustomer ? 'hidden' : ''} flex flex-row justify-between items-center gap-1 p-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300`}
                  onClick={() => dispatch({ type: 'show-add' })}
                ><PlusCircleIcon className="w-4 h-4" /> Agregar Producto</button>
              </div>
            </div>

            <div className="border-y border-y-gray-300 my-2 p-1">
              <PaginationReports paginationData={paginationData} dataName="Productos Registrados" />
            </div>

            <ProductsTable state={state!} products={productsPaginated!} dispatch={dispatch} />
          </article>
        </section>
      </main>

      <SelectFilterProductsModal products={productsPaginated!} state={state!} dispatch={dispatch} />
      <DeleteProductModal state={state!} dispatch={dispatch} />
    </>
  );
}