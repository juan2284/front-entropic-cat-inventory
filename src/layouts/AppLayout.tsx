import Navbar from "@/components/globals/Navbar";
import { ListActions } from "@/reducers/customerReducer";
import { Dispatch, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

type AppLayoutProps = {
  dispatch: Dispatch<ListActions>;
};

export default function AppLayout({dispatch}: AppLayoutProps) {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <main className="relative">
        <Navbar expand={expand} setExpand={setExpand} dispatch={dispatch} />

        <main className={`${expand ? 'start-56 min-w-[calc(100vw-14rem)]' : 'start-16 min-w-[calc(100vw-4rem)]'} h-screen absolute transition-all ease-in-out duration-300`}>
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