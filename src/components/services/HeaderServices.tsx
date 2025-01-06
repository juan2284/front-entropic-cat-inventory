import { useServices } from "@/hooks/ServicesHooks/useServices";
import { monthsTranslations } from "@/utils/es";
import Loader from "../globals/Loader";

export default function HeaderServices() {
  const { data, isLoading, isError, allServicesNumber, currentMonthName, currentmonthServicesNumber } = useServices();

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <section className="flex flex-row flex-wrap justify-start items-center border-b border-b-gray-200">
        <article className=" w-1/2 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Todos los Servicios</h4>
          <h5 className="w-full text-4xl text-center font-bold text-indigo-600">{allServicesNumber}</h5>
          <h5 className="w-full text-xs text-center font-bold">Clientes Atendidos</h5>
        </article>

        <article className=" w-1/2 flex flex-col justify-center items-start font-roboto p-2 border-e border-e-gray-200">
          <h4 className="w-full text-xs text-center font-light text-gray-500">Servicios de {monthsTranslations[currentMonthName]}</h4>
          <h5 className="w-full text-4xl text-center font-bold text-indigo-600">{currentmonthServicesNumber}</h5>
          <h5 className="w-full text-xs text-center font-bold">Clientes Atendidos</h5>
        </article>
      </section>
    </>
  );
}