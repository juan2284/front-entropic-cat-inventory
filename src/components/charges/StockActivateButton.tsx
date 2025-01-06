import { activateStock } from "@/api/StocktakingsAPI";
import { useStockByCharge } from "@/hooks/stocktakingHooks/useStocktakingByCharge";
import { Charge } from "@/types/types";
import { HandThumbUpIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusCircleIcon } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../globals/Loader";

type StockActivateButtonProps = {
  chargeId: Charge['_id'];
};

export default function StockActivateButton({chargeId}: StockActivateButtonProps) {
  const { data, isLoading, isError } = useStockByCharge(chargeId);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: activateStock,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stocktaking', chargeId] });
      toast.success(data.msg);
    }
  });

  const handleActive = () => {
    if (!isError) {
      const stock = data![0];
      const formData = {
        id: stock._id,
        stock: { stock_out: true }
      };
      mutate(formData);
    }
  };

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      {data[0]?.stock_out ? (
        <div className="flex flex-col justify-center items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
          <HandThumbUpIcon className="w-8 h-8 text-green-600" />
          <div>
            <h5 className="font-bold text-green-600 text-md">Mercancía Recibida</h5>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="flex flex-col justify-center items-center gap-2 rounded-sm py-4 px-2 bg-red-600 hover:bg-gray-100 group font-roboto font-light shadow-md transition-all ease-in-out duration-300 hover:cursor-pointer"
          onClick={handleActive}
          title="Activar el Stock para la Venta"
        >
          <MinusCircleIcon className="w-8 h-8 text-white group-hover:text-red-600 transition-all ease-in-out duration-300" />
          <div>
            <h5 className="font-bold text-white text-md group-hover:text-red-600 transition-all ease-in-out duration-300">Activar Stock</h5>
          </div>
        </button>
      )}
    </>
  );
}