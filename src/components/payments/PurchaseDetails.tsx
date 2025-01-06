import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";
import { ProductsArray } from "./AddPaymentForm";
import { XCircleIcon } from "lucide-react";
import { AddPaymentFormType, Product } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

type PurchaseDetailsProps ={
  products: ProductsArray | undefined;
  setProducts: Dispatch<SetStateAction<ProductsArray | undefined>>;
  setTotalAmountOne: Dispatch<SetStateAction<number>>;
  setTotalAmountTwo: Dispatch<SetStateAction<number>>;
  setValue: UseFormSetValue<AddPaymentFormType>;
  setProductSelected: Dispatch<SetStateAction<string>>;
  setQuantityProduct: Dispatch<SetStateAction<number>>;
};

export default function PurchaseDetails({products, setProducts, setTotalAmountOne, setTotalAmountTwo, setValue, setProductSelected, setQuantityProduct}: PurchaseDetailsProps) {
  const handleDelete = (id: Product['_id']) => {
    const productsFiltered = products?.filter(product => product.id !== id);
    let totalOne = 0;
    let totalTwo = 0;
    setProducts(productsFiltered);

    productsFiltered?.map(product => totalOne += product.total_price_one);
    setTotalAmountOne(Number(totalOne.toFixed(2)));
    productsFiltered?.map(product => totalTwo += product.total_price_two);
    setTotalAmountTwo(Number(totalTwo.toFixed(2)));

    setValue('total_amount', Number(totalOne.toFixed(2)));
  };

  const handleClean = () => {
    setProducts([]);
    setValue('total_amount', 0);
    setValue('amount_one', 0);
    setValue('amount_two', 0);
    setValue('amount_three', 0);
    setValue('pending_amount', 0);
    setTotalAmountOne(0);
    setTotalAmountTwo(0);
    setProductSelected('');
    setQuantityProduct(0);
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-sm p-2">
        <table className={`w-full text-xs text-center`}>
          <thead>
            <tr className='text-xs font-roboto text-gray-500'>
              <th className='font-light p-2 bg-gray-100'>Producto</th>
              <th className='font-light p-2 bg-gray-100'>Cantidad</th>
              <th className='font-light p-2 bg-gray-100'>Precio Bs.</th>
              <th className='font-light p-2 bg-gray-100'>Precio Total Bs.</th>
              <th className='font-light p-2 bg-gray-100'>Precio $</th>
              <th className='font-light p-2 bg-gray-100'>Precio Total $</th>
              <th className='font-light p-2 bg-gray-100'>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {products?.map(product => (
              <tr className={`border-b border-b-gray-300 font-bold font-roboto text-gray-600`} key={product.id}>
                <td className='p-2 text-gray-800'>{product.name}</td>
                <td className='p-2' title="Ver Proveedor">{product.quantity}</td>
                <td className='p-2'>{formatCurrencyLocal(product.unit_price_one)}</td>
                <td className='p-2'>{formatCurrencyLocal(product.total_price_one)}</td>
                <td className='p-2'>{formatCurrency(product.price_two)}</td>
                <td className='p-2'>{formatCurrency(product.total_price_two)}</td>
                <td className='p-2'>
                  <button
                    type="button"
                    className="w-full text-gray-100 flex justify-center items-center font-bold group"
                    onClick={() => handleDelete(product.id)}
                    title="Eliminar"
                  >
                    <XCircleIcon className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-all ease-in-out duration-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="w-11/12 text-xs uppercase text-gray-500 hover:text-red-600 transition-all ease-in-out duration-300 text-right font-semibold" onClick={handleClean}>Eliminar Todo</button>
      </div>
    </>
  );
}