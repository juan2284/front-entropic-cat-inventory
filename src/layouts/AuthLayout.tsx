import LogoHeader from "@/components/globals/LogoHeader"
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <main className="flex flex-col justify-center items-center">
        <header className="w-full p-3 flex flex-row justify-center items-center gap-4 bg-indigo-600 shadow-lg">
          <div>
            <h1 className="font-oswald text-5xl text-gray-100">EntropicCat</h1>
            <h4 className="font-roboto text-xs font-light text-indigo-300">Inventario</h4>
          </div>
          <LogoHeader />
        </header>

        <main className={`min-w-[calc(100vw-4rem)] transition-all ease-in-out duration-300`}>
          <Outlet />
        </main>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </main>
    </>
  );
}