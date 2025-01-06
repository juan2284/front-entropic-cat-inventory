import { useProducts } from "@/hooks/productsHooks/useProducts";
import { ListActions } from "@/reducers/customerReducer";
import { Product, Products } from "@/types/types";
import { categoriesTranslations, statusStockTranslations } from "@/utils/es";
import { PencilSquareIcon, QueueListIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { useNavigate } from "react-router-dom";

type ProductsTableProps = {
  state: {
    searchProduct: Products;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    productDetails: Product;
  },
  products: Products;
  dispatch: Dispatch<ListActions>;
};

export default function ProductsTable({state, products, dispatch}: ProductsTableProps) {
  const { productsDetails } = useProducts();
  const navigate = useNavigate();

  const handleDelete = (product: Product) => {
    dispatch({ type: 'set-product-details', payload: { product } });
    dispatch({ type: 'show-delete' });
  };

  const handleEdit = (product: Product) => {
    dispatch({ type: 'set-product-details', payload: { product } });
    dispatch({ type: 'show-edit' });
  };

  const handleDetails = (product: Product) => {
    dispatch({ type: 'set-product-details', payload: { product } });
    dispatch({ type: 'show-details', payload: { result: true } });
    navigate(`/productos/${product._id}`);
  };

  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Código</th>
            <th className='font-light p-2 bg-gray-100'>Nombre</th>
            <th className='font-light p-2 bg-gray-100'>Marca</th>
            <th className='font-light p-2 bg-gray-100'>Tipo</th>
            <th className='font-light p-2 bg-gray-100'>Descripción</th>
            <th className='font-light p-2 bg-gray-100'>Categoría</th>
            <th className='font-light p-2 bg-gray-100'>Inventario</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Detalles</th>
            <th className={`${state.viewEditCustomer || state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Editar</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {products.length !== 0 ? (
            <>
              {products.map(product => (
                <tr className={`${product._id === state.productDetails._id && state.viewEditCustomer ? 'text-red-600' : 'text-gray-600'} border-b border-b-gray-300 font-bold`} key={product._id}>
                  <td className='p-2'>{product.code}</td>
                  <td className='p-2'>{product.name}</td>
                  <td className='p-2'>{product.brand}</td>
                  <td className='p-2'>{product.type}</td>
                  <td className='p-2'>{product.description}</td>
                  <td className='p-2'>{categoriesTranslations[product.category]}</td>
                  <td className={`${productsDetails.filter(productDetails => productDetails.id === product._id)[0]?.stockStatus === 'in' ? 'text-teal-600' : productsDetails.filter(productDetails => productDetails.id === product._id)[0]?.stockStatus === 'low' ? 'text-amber-500' : 'text-red-600'} p-2`}>{statusStockTranslations[productsDetails.filter(productDetails => productDetails.id === product._id)[0]?.stockStatus]}</td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-400 flex justify-center items-center font-bold group"
                      onClick={() => handleDetails(product)}
                      title="Detalles"
                    >
                      <QueueListIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer || state.viewEditCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className={`w-full text-gray-400 flex justify-center items-center font-bold group`}
                      onClick={() => handleEdit(product)}
                      title="Editar"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-100 flex justify-center items-center font-bold group"
                      onClick={() => handleDelete(product)}
                      title="Eliminar"
                    >
                      <XCircleIcon className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  )
}