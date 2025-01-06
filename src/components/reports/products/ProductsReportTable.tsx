import { ProductReport } from "@/types/types";
import { categoriesTranslations } from "@/utils/es";

type ProductsReportTableProps = {
  products: ProductReport;
};

export default function ProductsReportTable({products}: ProductsReportTableProps) {

  return (
    <>
      <table className='w-full text-xs text-center mt-2'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Código</th>
            <th className='font-light p-2 bg-gray-100'>Nombre</th>
            <th className='font-light p-2 bg-gray-100'>Marca</th>
            <th className='font-light p-2 bg-gray-100'>Tipo</th>
            <th className='font-light p-2 bg-gray-100'>Descripción</th>
            <th className='font-light p-2 bg-gray-100'>Categoría</th>
            <th className='font-light p-2 bg-gray-100'>Existencia</th>
            <th className='font-light p-2 bg-gray-100'>Ventas</th>
            <th className='font-light p-2 bg-gray-100'>Cant. Inventarios</th>
          </tr>
        </thead>

        <tbody>
          {products.length !== 0 ? (
            <>
              {products.map(product => (
                <tr className={`text-gray-600 border-b border-b-gray-300 font-bold`} key={product.code}>
                  <td className='p-2'>{product.code}</td>
                  <td className='p-2'>{product.name}</td>
                  <td className='p-2'>{product.brand}</td>
                  <td className='p-2'>{product.type}</td>
                  <td className='p-2'>{product.description}</td>
                  <td className='p-2'>{categoriesTranslations[product.category]}</td>
                  <td className='p-2'>{product.stock}</td>
                  <td className='p-2'>{product.sales}</td>
                  <td className='p-2'>{product.stocksNumber}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}