import Loader from "@/components/globals/Loader";
import PaginationReports from "@/components/globals/PaginationReports";
import { useProducts } from "@/hooks/productsHooks/useProducts";
import { exportCSVFile } from "@/utils/convertToCSV";
import { CubeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import ProductsReportTable from "@/components/reports/products/ProductsReportTable";
import Logo from "@/components/globals/Logo";

export default function ProductsReports() {
  const { data, isLoading, isError, paginationData } = useProducts();
  const handleDownloadCSV = () => {
    paginationData.productsData?.unshift(paginationData.headersTable);
    exportCSVFile(paginationData.productsData!, 'ReporteProductos');
  };
  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Productos Registrados</h4>

      <Link
        className="w-1/4 flex flex-row justify-center items-center gap-1 p-2 mt-2 bg-indigo-600 text-gray-100 rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-700 transition-all ease-in-out duration-300"
        to={'/productos'}
      >
        <CubeIcon className="w-4 h-4" />
        Ir a Productos
      </Link>
    </div>
  );
    if (isLoading) return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
        <Loader />
      </div>
    );
    if (data) return (
    <>
      <section className="p-4">
        <header className="w-full flex md:flex-row justify-center items-center gap-2 mb-4 border-b border-b-gray-200">
          <Link
            to={'/reportes'}
            className="w-1/5 bg-indigo-600 text-xs font-roboto text-center hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
          >Regresar</Link>
          <h3
            className="w-4/5 font-black text-2xl text-slate-700 my-2 text-center flex flex-row justify-center items-center gap-2"
          >Reporte de Productos <CubeIcon className="w-6 h-6 text-indigo-600" /></h3>
        </header>

        <main className="flex flex-col justify-center items-center gap-2">
          <PaginationReports paginationData={paginationData} dataName="Productos" />

          <ProductsReportTable products={paginationData.productsData!} />
          <div className="w-full flex flex-row justify-center items-center gap-2 mt-2">
            <button
              type="submit"
              className="w-1/3 bg-indigo-600 text-xs font-roboto hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300 text-center"
              onClick={handleDownloadCSV}
            >Decargar .csv</button>

            {/* <button
              type="submit"
              className="w-1/3 bg-green-500 text-xs font-roboto hover:bg-green-600 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300 text-center"
            >Decargar .xlsx</button> */}
          </div>
        </main>
      </section>
    </>
  );
}