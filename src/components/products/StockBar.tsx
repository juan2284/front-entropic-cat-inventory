import { StatusStockType } from "@/types/types";

type StockBarProps = {
  data: StatusStockType;
};

export default function StockBar({data}: StockBarProps) {
  const allProducts = data.inStock + data.lowStock + data.outStock;
  const inStockPercent = Math.floor((data.inStock/allProducts)*100);
  const lowStockPercent = Math.floor((data.lowStock/allProducts)*100);
  const outStockPercent = Math.floor((data.outStock/allProducts)*100);

  return (
    <>
      <h5 className="text-xl font-bold font-roboto text-gray-500">{allProducts} <span className="text-xs align-middle font-light">Productos</span></h5>
      <div className="w-full h-2 bg-gray-200 rounded-full relative">
        <div className={`w-full flex flex-row justify-start items-center h-full absolute rounded-full cursor-pointer`}>
          <div className="bg-teal-500 h-full rounded-full hover:scale-x-110 transition-all ease-in-out duration-300" title="Stock mayor al 50%" style={{ width: `${inStockPercent}%` }}></div>
          <div className="bg-amber-500 h-full rounded-full hover:scale-x-110 transition-all ease-in-out duration-300" title="Stock menor al 50%" style={{ width: `${lowStockPercent}%` }}></div>
          <div className="bg-red-600 h-full rounded-full hover:scale-x-110 transition-all ease-in-out duration-300" title="Sin stock disponible" style={{ width: `${outStockPercent}%` }}></div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-start gap-3 p-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500"></div>
          <p className="text-xs text-gray-500 font-light">En Stock: <span className="font-bold">{data.inStock}</span></p>
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <p className="text-xs text-gray-500 font-light">Bajo Stock: <span className="font-bold">{data.lowStock}</span></p>
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
          <p className="text-xs text-gray-500 font-light">Sin Stock: <span className="font-bold">{data.outStock}</span></p>
        </div>
      </div>
    </>
  );
}