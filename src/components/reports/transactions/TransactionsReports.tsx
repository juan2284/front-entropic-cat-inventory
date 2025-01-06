import Loader from "@/components/globals/Loader";
import PaginationReports from "@/components/globals/PaginationReports";
import { useTransactions } from "@/hooks/transactionsHooks/useTransactions";
import { exportCSVFile } from "@/utils/convertToCSV";
import { HandshakeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionsReportTable from "./TransactionsReportTable";
import Logo from "@/components/globals/Logo";

export default function TransactionsReports() {
  const { data, isLoading, isError, paginationData, transactions } = useTransactions();
  const handleDownloadCSV = () => {
    paginationData.transactionsData?.unshift(paginationData.headersTable);
    exportCSVFile(paginationData.transactionsData!, 'ReporteTransacciones');
  };

  if (isError) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Logo />
      <h4 className="text-xs font-roboto text-gray-600 font-bold mt-2">No hay Transacciones Registrados</h4>
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
          >Reporte de Transacciones <HandshakeIcon className="w-6 h-6 text-indigo-600" /></h3>
        </header>

        <main className="flex flex-col justify-center items-center gap-2">
          <PaginationReports paginationData={paginationData} dataName="Compras Registradas" />

          <TransactionsReportTable transactions={transactions!} />
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