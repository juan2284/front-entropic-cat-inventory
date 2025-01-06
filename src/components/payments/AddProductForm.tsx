import { useProducts } from "@/hooks/productsHooks/useProducts";
import { ProductArray, ProductsArray, ProductsDetailsType } from "@/types/types";
import { PlusCircleIcon } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type AddProductFormProps = {
  products: ProductsArray | undefined;
  setProducts: Dispatch<SetStateAction<ProductsArray | undefined>>;
  productsSearched: ProductsDetailsType[] | undefined;
  setProductsSearched: Dispatch<SetStateAction<ProductsDetailsType[] | undefined>>;
  productSelected: string;
  setProductSelected: Dispatch<SetStateAction<string>>;
  quantityProduct: number;
  setQuantityProduct: Dispatch<SetStateAction<number>>;
  currencyRate: number;
  setTotalAmountOne: Dispatch<SetStateAction<number>>;
  setTotalAmountTwo: Dispatch<SetStateAction<number>>;
};
export default function AddProductForm({products, setProducts, setProductsSearched, productsSearched, productSelected, setProductSelected, quantityProduct, setQuantityProduct, currencyRate, setTotalAmountOne, setTotalAmountTwo}: AddProductFormProps) {
  const { productsDetails } = useProducts();
  const [search, setSearch] = useState('');

  const handleProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const productSearched = productsDetails.filter(product => product.code.includes(e.target.value) || product.product.toLowerCase().includes(e.target.value.toLowerCase()));
    setProductsSearched(productSearched);
  };

  const handleProductSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setProductSelected(e.target.value);
  };

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantityProduct(Number(e.target.value));
  };

  const handleProducts = () => {
    const productsArray: ProductsArray = [];
    let totalOne = 0;
    let totalTwo = 0;
    const productExist = products?.filter(productStored => productStored.id === productSelected);
    const productDetails = productsDetails.filter(details => details.id === productSelected);

    const product: ProductArray = {
      id: productSelected,
      name: '',
      price_one: 0,
      unit_price_one: 0,
      total_price_one: 0,
      price_two: 0,
      total_price_two: 0,
      quantity: Number(quantityProduct)
    };

    if (product.id === '') {
      toast.error('Debe seleccionar un producto.');
      return;
    }

    if (product.quantity <= 0) {
      toast.error('La cantidad debe ser mayor a 0.');
      return;
    }
    
    if (productDetails[0].globalStock < product.quantity || productDetails[0].globalStock === 0) {
      toast.error('No hay suficiente Stock.');
      return;
    }

    product.name = productDetails[0].product;
    product.price_one = Number(productDetails[0].priceOne.toFixed(2));
    product.price_two = Number(productDetails[0].priceTwo.toFixed(2));
    product.unit_price_one = Number((((product.price_two * product.quantity) * currencyRate) / product.quantity).toFixed(2));
    product.total_price_one = Number(((product.price_two * product.quantity) * currencyRate).toFixed(2));
    product.total_price_two = Number((product.price_two * product.quantity).toFixed(2));
    
    if (productExist?.length === 0 || productExist === undefined ) {
      products?.map(product => productsArray.push(product));
      productsArray.push(product);      
      setProducts(productsArray);

      productsArray?.map(product => totalOne += product.total_price_one);
      setTotalAmountOne(Number(totalOne.toFixed(2)));
      productsArray?.map(product => totalTwo += product.total_price_two);
      setTotalAmountTwo(Number(totalTwo.toFixed(2)));

      setProductsSearched([]);
      setQuantityProduct(0);
      setProductSelected('');
      setSearch('');

    } else {
      toast.error('El producto ya fue seleccionado.');
    }
  };
  return (
    <>
      <div
        className="w-full flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-sm p-2"
      >
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <label htmlFor="searchProduct" className="w-full text-sm font-bold text-slate-700 gap-2 p-1">
            Buscar Producto
          </label>
          <input
            type="text"
            value={search}
            id="searchProduct"
            className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Buscar Producto por código o Nombre"
            onChange={(e) => handleProduct(e)}
          />
        </div>

        {productsSearched?.length !== 0 && (
          <select
            className="w-full border border-gray-300 rounded-md bg-gray-200 text-xs font-roboto p-1 text-gray-600"
            id="product"
            onChange={(e) => handleProductSelected(e)}
          >
            <option value="">Seleccione</option>
            {productsSearched?.map(product => (
              <option key={product.id} value={product.id} className="text-xs text-gray-600 cursor-pointer hover:bg-gray-400 p-1 font-roboto rounded-md">{product.product} - Stock: {product.globalStock}</option>
            ))}
          </select>
        )}

        <div className="w-full flex flex-col justify-center items-center gap-2">
          <label htmlFor="quantity" className="w-2/6 text-sm font-bold text-slate-700 gap-2 p-1">
            Cantidad
          </label>
          <input
            type="number"
            id="quantity"
            min={0}
            value={quantityProduct}
            className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
            placeholder="Cantidad de Productos"
            onChange={(e) => handleQuantity(e)}
          />
        </div>

        <button
          className="w-full bg-green-600 hover:bg-green-700 rounded-sm flex flex-row justify-center items-center gap-2 p-1 transition-all ease-in-out duration-300 text-white text-xs uppercase font-bold"
          title="Agregar Producto"
          type="button"
          onClick={handleProducts}
        >
          <PlusCircleIcon className="text-white w-4" />
          Agregar
        </button>
      </div>
    </>
  );
}