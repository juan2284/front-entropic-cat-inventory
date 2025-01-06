import LogoHeader from "@/components/globals/LogoHeader";
import { useUser } from "@/hooks/authHooks/useUser";
import { BanknotesIcon, CreditCardIcon, CubeTransparentIcon, TruckIcon, UsersIcon, WrenchIcon } from "@heroicons/react/20/solid";
import { Handshake, SheetIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const { data } = useUser();
  return (
    <>
      <div className="w-full h-full relative">
        <header className="w-full p-3 flex flex-row justify-center items-center gap-4 bg-indigo-600 shadow-lg">
          <div>
            <h1 className="font-oswald text-5xl text-gray-100">EntropicCat</h1>
            <h4 className="font-roboto text-xs font-light text-indigo-300">Inventario</h4>
          </div>
          <LogoHeader />
        </header>

        <main className="w-full flex flex-col justify-center items-center">

          <section className="w-full grid grid-cols-3 gap-6 p-6">
            <Link to={'/agregar-cobro'} className="w-full flex flex-col justify-center items-center gap-2">
              <header className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
                <div className="flex flex-row justify-center items-center gap-2">
                  <BanknotesIcon className="w-8 h-8 text-indigo-600 group-hover:text-gray-100" />
                  <h5 className="font-bold text-gray-600 text-sm group-hover:text-gray-100">Registrar Cobro a Cliente</h5>
                </div>
              </header>
            </Link>

            {data?.role === 'admin' && (
              <Link to={'/agregar-pago'} className="w-full flex flex-col justify-center items-center gap-2">
                <header className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <CreditCardIcon className="w-8 h-8 text-indigo-600 group-hover:text-gray-100" />
                    <h5 className="font-bold text-gray-600 text-sm group-hover:text-gray-100">Registrar Pago a Proveedor</h5>
                  </div>
                </header>
              </Link>
            )}

            <Link to={'/agregar-servicio'} className="w-full flex flex-col justify-center items-center gap-2">
              <header className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md group hover:bg-indigo-600">
                <div className="flex flex-row justify-center items-center gap-2">
                  <WrenchIcon className="w-8 h-8 text-indigo-600 group-hover:text-gray-100" />
                  <h5 className="font-bold text-gray-600 text-sm group-hover:text-gray-100">Registrar Servicio</h5>
                </div>
              </header>
            </Link>
          </section>

          <section className="w-full grid grid-cols-3 gap-6 p-6">
            <article className="w-full flex flex-col justify-center items-center gap-2">
              <header className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
                <div className="flex flex-col justify-center items-center">
                  <UsersIcon className="w-8 h-8 text-indigo-600" />
                  <h5 className="font-bold text-gray-600 text-sm">Clientes</h5>
                </div>
              </header>
              <main className="w-full grid grid-cols-3 gap-2">
                <Link to={'/clientes'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Clientes</Link>
                <Link to={'/cobros'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Cobros</Link>
                <Link to={'/servicios'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Servicios</Link>
                <Link to={'/recordatorios'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2 col-span-3">Recordatorios</Link>
              </main>
            </article>

            {data?.role === 'admin' && (
              <>
                <article className="w-full flex flex-col justify-center items-center gap-2">
                  <header className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
                    <div className="flex flex-col justify-center items-center">
                      <TruckIcon className="w-8 h-8 text-indigo-600" />
                      <h5 className="font-bold text-gray-600 text-sm">Proveedores</h5>
                    </div>
                  </header>
                  <main className="w-full grid grid-cols-3 gap-2">
                    <Link to={'/proveedores'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2 col-span-3">Proveedores</Link>
                    <Link to={'/pagos'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2 col-span-3">Pagos</Link>
                  </main>
                </article>

                <article className="w-full flex flex-col justify-center items-center gap-2">
                  <header className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
                    <div className="flex flex-col justify-center items-center">
                      <CubeTransparentIcon className="w-8 h-8 text-indigo-600" />
                      <h5 className="font-bold text-gray-600 text-sm">Inventario</h5>
                    </div>
                  </header>
                  <main className="w-full grid grid-cols-3 gap-2">
                    <Link to={'/productos'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2 col-span-3">Productos</Link>
                    <Link to={'/inventario'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2 col-span-3">Inventario</Link>
                  </main>
                </article>

                <article className="w-full flex flex-col justify-center items-center gap-2 col-start-2">
                  <header className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
                    <div className="flex flex-col justify-center items-center">
                      <Handshake className="w-8 h-8 text-indigo-600" />
                      <h5 className="font-bold text-gray-600 text-sm">Transacciones</h5>
                    </div>
                  </header>
                  <main className="w-full grid grid-cols-3 gap-2">
                    <Link to={'/transacciones'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2 col-span-3">Transacciones</Link>
                  </main>
                </article>
              </>
            )}
          </section>
          
          {data?.role === 'admin' && (
            <section className="w-full grid grid-cols-1 gap-6 p-6">
              <article className="w-full flex flex-col justify-center items-center gap-2">
                <header className="w-full flex flex-row justify-around items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
                  <div className="flex flex-col justify-center items-center">
                    <SheetIcon className="w-8 h-8 text-indigo-600" />
                    <h5 className="font-bold text-gray-600 text-sm">Reportes</h5>
                  </div>
                </header>
                <main className="w-full grid grid-cols-3 gap-2">
                  <Link to={'/reportes-customers'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Clientes</Link>
                  <Link to={'/reportes-payments'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Cobros</Link>
                  <Link to={'/reportes-services'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Servicios</Link>
                  <Link to={'/reportes-reminders'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Recordatorios</Link>
                  <Link to={'/reportes-products'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Productos</Link>
                  <Link to={'/reportes-stocks'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Inventarios</Link>
                  <Link to={'/reportes-sales'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Ventas por Productos</Link>
                  <Link to={'/reportes-suppliers'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Proveedores</Link>
                  <Link to={'/reportes-charges'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Pagos</Link>
                  <Link to={'/reportes-transactions'} className="w-full text-gray-500 text-xs font-bold text-center bg-gray-100 hover:bg-indigo-600 shadow-lg hover:text-gray-100 rounded-sm p-2">Reporte de Transacciones</Link>
                </main>
              </article>
            </section>
          )}

        </main>
      </div>
    </>
  );
}