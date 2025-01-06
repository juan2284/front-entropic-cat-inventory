import { addNewPayment } from "@/api/PaymentsAPI";
import { AddPaymentFormType, Customer, Product } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddNewPaymentForm from "@/components/payments/AddNewPaymentForm";
import CustomerCheckForm from "@/components/payments/CustomerCheckForm";
import PaymentsDetailsCustomer from "@/components/payments/PaymentsDetailsCustomer";
import CustomerPaymentForm from "@/components/payments/CustomerPaymentForm";

export type ProductArray = {
  id: Product['_id'];
  name: string;
  price_one: number;
  unit_price_one: number;
  total_price_one: number;
  total_price_two: number;
  price_two: number;
  quantity: number;
};
export type ProductsArray = ProductArray[];

export default function AddPaymentForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors }, getValues, setValue } = useForm<AddPaymentFormType>();
  const [currencyRate, setCurrencyRate] = useState(0);
  const [customer, setCustomer] = useState<Customer>();
  const [products, setProducts] = useState<ProductsArray>();
  const [totalAmountOne, setTotalAmountOne] = useState(0);
  const [totalAmountTwo, setTotalAmountTwo] = useState(0);
  const [productSelected, setProductSelected] = useState('');
  const [quantityProduct, setQuantityProduct] = useState(0);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNewPayment,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success(data.msg);
    }
  });

  const handleForm = (data: AddPaymentFormType) => {
    const selectedProducts: {id: string, quantity: number, unitPrice: number}[] = [];
    products?.map(product => {
      const mappedProduct = {
        id: product.id,
        quantity: product.quantity,
        unitPrice: product.price_two
      };
      selectedProducts.push(mappedProduct);
    });

    const paymentStatus: 'paid' | 'pending' = Number(data.pending_amount) === 0 ? 'paid' : 'pending';

    const dataObject = {
      total_amount: Number(data.total_amount),
      customer: customer!._id,
      products: selectedProducts,
      amount_one: Number(data.amount_one),
      amount_two: Number(data.amount_two),
      amount_three: Number(data.amount_three),
      currency_rate: currencyRate,
      status: paymentStatus,
      pending_amount: Number(data.pending_amount)
    };

    mutate(dataObject);
    reset();
    navigate('/cobros');
  };

  const handleReset = () => {
    setProducts([]);
    setValue('total_amount', 0);
    setValue('amount_one', 0);
    setValue('amount_two', 0);
    setValue('amount_three', 0);
    setValue('pending_amount', 0);
    setCurrencyRate(0);
    setTotalAmountOne(0);
    setTotalAmountTwo(0);
    setProductSelected('');
    setQuantityProduct(0);
    reset();
  };
  return (
    <>
      <CustomerCheckForm customer={customer!} setCustomer={setCustomer} />

      {customer !== undefined ? (
        <form
          className="w-4/5 p-3 m-auto font-roboto"
          onSubmit={handleSubmit(handleForm)}
        >
          <div className="w-full flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-sm p-2">
            <h4 className="w-full text-md text-center font-oswald text-gray-500 mt-4 mb-4">Deudas Pendientes:</h4>
            <PaymentsDetailsCustomer customer={customer} />
          </div>

          <div className="w-full text-center flex flex-col justify-between items-center gap-2 mt-4">
            <h4 className="w-full text-md text-center font-oswald text-gray-500">Detalles de la Transacción:</h4>
            <AddNewPaymentForm register={register} errors={errors} getValues={getValues} setValue={setValue} products={products} setProducts={setProducts!} currencyRate={currencyRate} setCurrencyRate={setCurrencyRate} totalAmountOne={totalAmountOne} setTotalAmountOne={setTotalAmountOne} totalAmountTwo={totalAmountTwo} setTotalAmountTwo={setTotalAmountTwo} productSelected={productSelected} setProductSelected={setProductSelected} quantityProduct={quantityProduct} setQuantityProduct={setQuantityProduct} />
          </div>

          {currencyRate > 0 && (
            <>
              <div className="w-full flex md:flex-row justify-center items-center gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
                >Registrar Pago</button>

                <button
                  type="button"
                  className="bg-gray-200 text-xs font-roboto hover:bg-gray-300 w-full p-2 text-gray-600 uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
                  onClick={handleReset}
                >Resetear</button>
              </div>
            </>
          )}
        </form>
      ) : (
        <>
          <h4 className="w-full text-md text-center font-oswald text-gray-500 mt-4">El Cliente no está Registrado</h4>
          <CustomerPaymentForm />
        </>
      )}
    </>
  );
}