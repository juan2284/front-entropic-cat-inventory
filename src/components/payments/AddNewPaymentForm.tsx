import { AddPaymentFormType, ProductsDetailsType } from "@/types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import CurrencyRateForm from "@/components/payments/CurrencyRateForm";
import AddProductForm from "@/components/payments/AddProductForm";
import { ProductsArray } from "@/components/payments/AddPaymentForm";
import PurchaseDetails from "@/components/payments/PurchaseDetails";
import AmountsForm from "@/components/payments/AmountsForm";

type AddNewPaymentFormProps ={
  register: UseFormRegister<AddPaymentFormType>;
  errors: FieldErrors<AddPaymentFormType>;
  getValues: UseFormGetValues<AddPaymentFormType>;
  setValue: UseFormSetValue<AddPaymentFormType>;
  products: ProductsArray | undefined;
  setProducts: Dispatch<SetStateAction<ProductsArray | undefined>>;
  currencyRate: number;
  setCurrencyRate: Dispatch<SetStateAction<number>>;
  productSelected: string;
  setProductSelected: Dispatch<SetStateAction<string>>;
  totalAmountOne: number;
  setTotalAmountOne: Dispatch<SetStateAction<number>>;
  totalAmountTwo: number;
  setTotalAmountTwo: Dispatch<SetStateAction<number>>;
  quantityProduct: number;
  setQuantityProduct: Dispatch<SetStateAction<number>>;
};

export default function AddNewPaymentForm({register, errors, getValues, setValue, products, setProducts, currencyRate, setCurrencyRate, totalAmountOne, setTotalAmountOne, totalAmountTwo, setTotalAmountTwo, productSelected, setProductSelected, quantityProduct, setQuantityProduct}: AddNewPaymentFormProps) {
  const [productsSearched, setProductsSearched] = useState<ProductsDetailsType[]>();

  useEffect(() => {
    setValue('total_amount', totalAmountOne);
  }, [totalAmountOne]);
  return (
    <>
      <CurrencyRateForm setCurrencyRate={setCurrencyRate} setProducts={setProducts} setProductSelected={setProductSelected} setQuantityProduct={setQuantityProduct} setTotalAmountOne={setTotalAmountOne} setTotalAmountTwo={setTotalAmountTwo} setValue={setValue} />

      {currencyRate > 0 && (
        <>
          <AddProductForm products={products} setProducts={setProducts} productsSearched={productsSearched} setProductsSearched={setProductsSearched} productSelected={productSelected} setProductSelected={setProductSelected} quantityProduct={quantityProduct} setQuantityProduct={setQuantityProduct} currencyRate={currencyRate} setTotalAmountOne={setTotalAmountOne} setTotalAmountTwo={setTotalAmountTwo} />

          {products?.length !== 0 && products !== undefined ? (
            <PurchaseDetails products={products} setProducts={setProducts} setTotalAmountOne={setTotalAmountOne} setTotalAmountTwo={setTotalAmountTwo} setValue={setValue} setProductSelected={setProductSelected} setQuantityProduct={setQuantityProduct} />
          ) : null}

          <AmountsForm register={register} errors={errors} getValues={getValues} setValue={setValue} currencyRate={currencyRate} totalAmountTwo={totalAmountTwo} />
        </>
      )}
    </>
  );
}