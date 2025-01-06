import { Product } from "@/types/types";
import { Link } from "react-router-dom";

type ProductImageProps = {
  state: {
    productDetails: Product;
  };
};

export default function ProductImage({state}: ProductImageProps) {
  return (
    <>
      <div className="w-1/4 m-auto border border-gray-200 rounded-sm p-2">
        <Link to={`${state.productDetails.image}`} target="__blank" rel="noreferrer"><img src={`${state.productDetails.image}`} rel="noreferrer" alt={`${state.productDetails.name}`} /></Link>
      </div>
    </>
  );
}