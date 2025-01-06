import { Stocktaking } from "@/types/types";
import StockLayout from "@/components/stocktaking/StockLayout";

type StockPartialDetailsProps = {
  stock: Stocktaking;
};

export default function StockPartialDetails({stock}: StockPartialDetailsProps) {
  return (
    <>
      <section className={`w-full`}>
        <main className="flex flex-col justify-center items-center gap-2">
          <div className="w-full grid grid-cols-3 gap-2 border-b border-b-gray-300 p-2">
            <StockLayout stock={stock} />
          </div>
        </main>
      </section>
    </>
  )
}