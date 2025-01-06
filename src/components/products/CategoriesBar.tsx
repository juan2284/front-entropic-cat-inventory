import { GlobalStockByCategoriesType } from "@/types/types";
import { categoriesTranslations } from "@/utils/es";

type CategoriesBarProps = {
  data: GlobalStockByCategoriesType[]
};

export default function CategoriesBar({data}: CategoriesBarProps) {
  return (
    <>
      <h5 className="text-xl font-bold font-roboto text-gray-500">{data.length} <span className="text-xs align-middle font-light">Categorías</span></h5>

      <div className="w-full flex flex-row flex-wrap justify-center items-start gap-1 p-2">
        {data.map(category => (
          <div className="flex flex-row justify-center items-center gap-2" key={category.category}>
            <div className="w-full rounded-[2px] bg-indigo-200 font-roboto">
              <p className="text-left text-xs font-light bg-indigo-200 py-1 px-3 rounded-[2px]">{categoriesTranslations[category.category]}: <span className="font-bold text-indigo-600">{category.productQ} producto{category.productQ > 1 ? 's' : ''}</span></p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}