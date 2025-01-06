import LogoHeader from "@/components/globals/LogoHeader";
import { BanknotesIcon, BellAlertIcon, CreditCardIcon, CubeIcon, CubeTransparentIcon, TruckIcon, UsersIcon, WrenchIcon } from "@heroicons/react/20/solid";
import { CoinsIcon, HandshakeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReportsView() {
  return (
    <>
      <main className="w-full h-full relative">
        <header className="w-full p-3 flex flex-row justify-center items-center gap-4 bg-indigo-600 shadow-lg">
          <div>
            <h1 className="font-oswald text-5xl text-gray-100">EntropicCat</h1>
            <h4 className="font-roboto text-xs font-light text-indigo-300">Inventario</h4>
          </div>
          <LogoHeader />
        </header>

        <h4 className="text-center text-2xl font-light font-oswald text-gray-600 mt-2">Reportes</h4>
        <section className="w-full grid grid-cols-3 gap-6 p-6">

          <Link to={'/reportes-customers'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <UsersIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Clientes</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-payments'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <BanknotesIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Cobros</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-services'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <WrenchIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Servicios</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-reminders'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <BellAlertIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Recordatorios</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-products'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <CubeIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Productos</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-stocks'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <CubeTransparentIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Inventarios</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-sales'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <CoinsIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Ventas por Producto</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-suppliers'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <TruckIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Proveedores</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-charges'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <CreditCardIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Pagos a Proveedores</h5>
              </div>
            </div>
          </Link>

          <Link to={'/reportes-transactions'} className="w-full flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
              <div className="flex flex-row justify-center items-center gap-2">
                <HandshakeIcon className="w-6 h-6 text-indigo-600 group-hover:text-gray-100" />
                <h5 className="font-bold text-sm text-gray-600 text-md group-hover:text-gray-100">Reporte de Transacciones</h5>
              </div>
            </div>
          </Link>

        </section>
      </main>
    </>
  );
}