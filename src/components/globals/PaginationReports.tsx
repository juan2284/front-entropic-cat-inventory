import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type PaginationReportsProps = {
  paginationData: {
    totalData: number,
    pagesData: number,
  };
  dataName: string;
};

export default function PaginationReports({paginationData, dataName}: PaginationReportsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSelected = queryParams.get('page') ? queryParams.get('page') : 1;
  const skipSelected = queryParams.get('skipData') ? queryParams.get('skipData') : 10;

  const handlePaginationUp = () => {
    navigate(location.pathname + `?page=${Number(pageSelected) + 1}&skipData=${skipSelected}`);
  };

  const handleSkipData = (e: ChangeEvent<HTMLSelectElement>) => {
    navigate(location.pathname + `?page=${pageSelected}&skipData=${e.target.value}`);
  };

  const handlePaginationDown = () => {
    navigate(location.pathname + `?page=${Number(pageSelected) - 1}&skipData=${skipSelected}`);
  };
  return (
    <>
      <section className="w-full flex flex-row justify-center items-center">
        <h4 className="w-full font-roboto text-xs text-gray-500 p-2 text-center">{dataName}: <span className="font-bold">{paginationData.totalData}</span></h4>

        <form noValidate className="w-full flex flex-row justify-center items-center ">
          <label htmlFor="skipData" className="w-full font-roboto text-xs text-gray-500 p-2 text-center">Número de Resultados:</label>
          <select name="skipData" id="skipData" defaultValue={Number(skipSelected)} className="text-xs font-roboto p-2 rounded-sm text-gray-500" onChange={handleSkipData}>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
          </select>

        </form>

        <nav className="w-full flex flex-row justify-center items-center gap-2 text-xs text-gray-500 p-2">
          <p>Paginas: <span className="font-bold">{paginationData.pagesData}</span></p>

          {Number(pageSelected) === 1 ? (
            <ChevronDoubleLeftIcon className="w-4 h-4 text-gray-300" title="Página Anterior" />
          ) : (
            <button className="group" title="Página Anterior" onClick={handlePaginationDown}>
              <ChevronDoubleLeftIcon className="w-4 h-4 group-hover:text-indigo-600" />
            </button>
          )}

          <p className="font-bold cursor-pointer" title="Página Actual">{pageSelected}</p>

          {Number(pageSelected) === paginationData.pagesData ? (
            <ChevronDoubleRightIcon className="w-4 h-4 text-gray-300" title="Página Siguiente" />
          ) : (
            <button className="group" title="Página Siguiente" onClick={handlePaginationUp}>
              <ChevronDoubleRightIcon className="w-4 h-4 group-hover:text-indigo-600" />
            </button>
          )}
        </nav>
      </section>
    </>
  );
}