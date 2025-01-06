import { ProductsTransactionSchema } from "@/types/types";
import { categoriesTranslations } from "@/utils/es";
import { Link } from "react-router-dom";

type PaymentProductsTableProps = {
  products: ProductsTransactionSchema[];
};

export default function PaymentProductsTable({products}: PaymentProductsTableProps) {
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
            <th className='font-light p-2 bg-gray-100'>Cantidad</th>
          </tr>
        </thead>

        <tbody>
          {products.length !== 0 ? (
            <>
              {products.map(product => (
                <tr className={' border-b border-b-gray-300 font-bold text-gray-600'} key={product.id._id}>
                  <td>
                    <Link to={`/productos/${product.id._id}`} title="Ver Producto" className="hover:text-gray-400 p-2">
                      {product.id.code}
                    </Link>
                  </td>
                  <td className='p-2'>{product.id.name}</td>
                  <td className='p-2'>{product.id.brand}</td>
                  <td className='p-2'>{product.id.type}</td>
                  <td className='p-2'>{product.id.description}</td>
                  <td className='p-2'>{categoriesTranslations[product.id.category]}</td>
                  <td className='p-2'>{product.quantity}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}