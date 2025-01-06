import Logo from "@/components/globals/Logo";
import { useUser } from "@/hooks/authHooks/useUser";
import { ListActions } from "@/reducers/customerReducer";
import { ArrowLeftStartOnRectangleIcon, BanknotesIcon, BellAlertIcon, ChevronDoubleLeftIcon, ChevronRightIcon, CreditCardIcon, CubeIcon, CubeTransparentIcon, TruckIcon, UsersIcon, WrenchIcon } from "@heroicons/react/20/solid";
import { HandshakeIcon, LayoutDashboardIcon, SheetIcon, UserPen, Users } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";

type NavbarProps ={
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<ListActions>;
};

export default function Navbar({expand, setExpand, dispatch}: NavbarProps) {
  const location = useLocation();
  const { data } = useUser();
  return (
    <>
      <nav className={`${expand === false ? 'w-16' : 'w-56'} bg-gray-100 py-4 h-screen shadow-lg fixed top-0 overflow-y-auto overflow-x-hidden transition-all ease-in-out duration-300 z-50`}>
        <header className={`${expand ? '' : 'mb-4'} font-roboto flex flex-col justify-center items-center gap-2`}>
          <button
            className={`${expand ? 'absolute -end-[0.2rem] top-4 rounded-l-full bg-white border-l border-l-gray-200 border-b border-b-gray-200 border-t border-t-gray-200' : 'w-6 h-6 rounded-full'} p-1 hover:bg-indigo-600 hover:border-b-indigo-600 hover:border-l-indigo-600 hover:border-t-indigo-600 group transition-all ease-in-out duration-300`}
            onClick={() => setExpand(expand ? false : true)}
          >
            {expand ? (
              <ChevronDoubleLeftIcon className="w-4 text-gray-300 group-hover:text-white transition-all ease-in-out duration-300" />
            ) : (
              <ChevronRightIcon className="w-4 text-gray-300 group-hover:text-white transition-all ease-in-out duration-300" />
            )}
          </button>
          
          <Logo />

          <div className={`${expand ? '' : 'hidden'} flex flex-col justify-center items-center mb-2`}>
            <h3 className="font-oswald font-light">EntropicCat</h3>
            <h4 className="text-xs text-gray-400 font-roboto">Manejo de Inventario</h4>
          </div>
        </header>

        <section className={`${expand ? 'mb-2' : ''}`}>
          <Link
            to={'/'}
            className={`w-full ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
            title="Inicio"
            onClick={() => dispatch({type: 'clear-states'})}
          >
            <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-2 flex flex-row items-center gap-2`}>
              <LayoutDashboardIcon className={`${location.pathname === '/' ? 'text-white' : ''} w-5  text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
              <div className={`${expand ? '' : 'hidden'}`}>
                <p className={`${location.pathname === '/' ? 'text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Inicio</p>
              </div>
            </div>
          </Link>
        </section>

        <section className={`${expand ? 'mb-4' : ''}`}>
          <h4 className={`${expand ? '' : 'hidden'} uppercase text-gray-500 text-xs font-light font-oswald px-2`}>Clientes</h4>
          <div className="w-10/12 m-auto border-b border-b-slate-300 my-1"></div>

          <Link
            to={'/clientes'}
            className={`w-full ${location.pathname.includes('clientes') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
            title="Clientes"
            onClick={() => dispatch({type: 'clear-states'})}
          >
            <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
              <UsersIcon className={`${location.pathname.includes('clientes') ? 'text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
              <div className={`${expand ? '' : 'hidden'}`}>
                <p className={`${location.pathname.includes('clientes') ? 'text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Clientes</p>
              </div>
            </div>
          </Link>

          <Link
            to={'/cobros'}
            className={`w-full ${location.pathname.includes('cobro') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
            title="Cobros a Clientes"
            onClick={() => dispatch({type: 'clear-states'})}
          >
            <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
              <BanknotesIcon className={`${location.pathname.includes('cobro') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
              <div className={`${expand ? '' : 'hidden'}`}>
                <p className={`${location.pathname.includes('cobro') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Cobros</p>
              </div>
            </div>
          </Link>

          <Link
            to={'/servicios'}
            className={`w-full ${location.pathname.includes('servicio') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
            title="Servicios"
            onClick={() => dispatch({type: 'clear-states'})}
          >
            <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
              <WrenchIcon className={`${location.pathname.includes('servicio') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
              <div className={`${expand ? '' : 'hidden'}`}>
                <p className={`${location.pathname.includes('servicio') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Servicios</p>
              </div>
            </div>
          </Link>

          <Link
            to={'/recordatorios'}
            className={`w-full ${location.pathname.includes('recordatorios') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
            title="Recordatorios"
            onClick={() => dispatch({ type: 'clear-states' })}
          >
            <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
              <BellAlertIcon className={`${location.pathname.includes('recordatorios') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
              <div className={`${expand ? '' : 'hidden'}`}>
                <p className={`${location.pathname.includes('recordatorios') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Recordatorios</p>
              </div>
            </div>
          </Link>
        </section>
        
        {data?.role === 'admin' && (
          <>
            <section className={`${expand ? 'mb-4' : ''}`}>
              <h4 className={`${expand ? '' : 'hidden'} uppercase text-gray-500 text-xs font-light font-oswald px-2`}>Inventario</h4>
              <div className="w-10/12 m-auto border-b border-b-slate-300 my-1"></div>

              <Link
                to={'/productos'}
                className={`w-full ${location.pathname.includes('productos') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
                title="Productos"
                onClick={() => dispatch({ type: 'clear-states' })}
              >
                <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
                  <CubeIcon className={`${location.pathname.includes('productos') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
                  <div className={`${expand ? '' : 'hidden'}`}>
                    <p className={`${location.pathname.includes('productos') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Productos</p>
                  </div>
                </div>
              </Link>

              <Link
                to={'/inventario'}
                className={`w-full ${location.pathname.includes('inventario') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
                title="Inventario"
                onClick={() => dispatch({ type: 'clear-states' })}
              >
                <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
                  <CubeTransparentIcon className={`${location.pathname.includes('inventario') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
                  <div className={`${expand ? '' : 'hidden'}`}>
                    <p className={`${location.pathname.includes('inventario') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Inventario</p>
                  </div>
                </div>
              </Link>
            </section>

            <section className={`${expand ? 'mb-4' : ''}`}>
              <h4 className={`${expand ? '' : 'hidden'} uppercase text-gray-500 text-xs font-light font-oswald px-2`}>Proveedores</h4>
              <div className="w-10/12 m-auto border-b border-b-slate-300 my-1"></div>

              <Link
                to={'/proveedores'}
                className={`w-full ${location.pathname.includes('proveedores') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
                title="Proveedores"
                onClick={() => dispatch({ type: 'clear-states' })}
              >
                <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
                  <TruckIcon className={`${location.pathname.includes('proveedores') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
                  <div className={`${expand ? '' : 'hidden'}`}>
                    <p className={`${location.pathname.includes('proveedores') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Proveedores</p>
                  </div>
                </div>
              </Link>

              <Link
                to={'/pagos'}
                className={`w-full ${location.pathname.includes('pago') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
                title="Pagos a Proveedores"
                onClick={() => dispatch({ type: 'clear-states' })}
              >
                <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
                  <CreditCardIcon className={`${location.pathname.includes('pago') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
                  <div className={`${expand ? '' : 'hidden'}`}>
                    <p className={`${location.pathname.includes('pago') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Pagos</p>
                  </div>
                </div>
              </Link>
            </section>

            <section className={`${expand ? 'mb-4' : ''}`}>
              <h4 className={`${expand ? '' : 'hidden'} uppercase text-gray-500 text-xs font-light font-oswald px-2`}>Transacciones</h4>
              <div className="w-10/12 m-auto border-b border-b-slate-300 my-1"></div>

              <Link
                to={'/transacciones'}
                className={`w-full ${location.pathname.includes('transacciones') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
                title="Transacciones"
                onClick={() => dispatch({ type: 'clear-states' })}
              >
                <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
                  <HandshakeIcon className={`${location.pathname.includes('transacciones') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
                  <div className={`${expand ? '' : 'hidden'}`}>
                    <p className={`${location.pathname.includes('transacciones') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Transacciones</p>
                  </div>
                </div>
              </Link>
            </section>

            <section className={`${expand ? 'mb-4' : ''}`}>
              <h4 className={`${expand ? '' : 'hidden'} uppercase text-gray-500 text-xs font-light font-oswald px-2`}>Reportes</h4>
              <div className="w-10/12 m-auto border-b border-b-slate-300 my-1"></div>

              <Link
                to={'/reportes'}
                className={`w-full ${location.pathname.includes('reportes') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
                title="Reportes"
                onClick={() => dispatch({ type: 'clear-states' })}
              >
                <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
                  <SheetIcon className={`${location.pathname.includes('reportes') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
                  <div className={`${expand ? '' : 'hidden'}`}>
                    <p className={`${location.pathname.includes('reportes') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Reportes</p>
                  </div>
                </div>
              </Link>
            </section>
          </>
        )}

        <section className={`${expand ? 'mb-4' : ''}`}>
          <h4 className={`${expand ? '' : 'hidden'} uppercase text-gray-500 text-xs font-light font-oswald px-2`}>Usuarios</h4>
          <div className="w-10/12 m-auto border-b border-b-slate-300 my-1"></div>

          {data?.role === 'admin' && (
            <>
              <Link
                to={'/usuarios'}
                className={`w-full ${location.pathname.includes('usuario') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
                title="Usuarios"
                onClick={() => dispatch({ type: 'clear-states' })}
              >
                <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
                  <Users className={`${location.pathname.includes('usuario') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
                  <div className={`${expand ? '' : 'hidden'}`}>
                    <p className={`${location.pathname.includes('usuario') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Crear Usuarios</p>
                  </div>
                </div>
              </Link>
            </>
          )}

          <Link
            to={'/perfil'}
            className={`w-full ${location.pathname.includes('perfil') ? 'bg-indigo-600 text-white' : ''} block w-full group hover:bg-indigo-600 transition-all ease-in-out duration-300 mb-1 px-2`}
            title="Perfil"
            onClick={() => dispatch({ type: 'clear-states' })}
          >
            <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
              <UserPen className={`${location.pathname.includes('perfil') ? 'bg-indigo-600 text-white' : ''} w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
              <div className={`${expand ? '' : 'hidden'}`}>
                <p className={`${location.pathname.includes('perfil') ? 'bg-indigo-600 text-white' : ''} text-xs font-bold text-gray-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Perfil</p>
              </div>
            </div>
          </Link>

          <Link
            to={'/auth/login'}
            className={`block w-full group hover:bg-red-600 transition-all ease-in-out duration-300 mb-1 px-2`}
            title="Cerrar Sesión"
            onClick={() => {localStorage.removeItem('AUTH_TOKEN');}}
          >
            <div className={`${expand ? 'justify-start ' : 'justify-center'} rounded-md p-1 flex flex-row items-center gap-2`}>
              <ArrowLeftStartOnRectangleIcon className={`w-5 text-gray-400 group-hover:text-white transition-all ease-in-out duration-300`} />
              <div className={`${expand ? '' : 'hidden'}`}>
                <p className={`text-xs font-bold text-red-600 font-roboto group-hover:text-white transition-all ease-in-out duration-300`}>Cerrar Sesión</p>
              </div>
            </div>
          </Link>
        </section>

      </nav>
    </>
  );
}