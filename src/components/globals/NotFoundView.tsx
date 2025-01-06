import { Link } from "react-router-dom";

export default function NotFoundView() {
  const authenticated = localStorage.getItem('AUTH_TOKEN');
  return (
    <>
      <img src="/icon.png" alt="Logotipo Distribuidora Hernán 2050" className="w-60 mb-10 p-2 m-auto" />

      <h1 className="font-black text-center font-oswald text-4xl">Error <span className="text-indigo-500">404</span></h1>
      <h1 className="font-light text-center font-roboto text-xl">Página No Encontrada</h1>
        {authenticated ? (
          <p className="mt-10 text-center font-roboto font-light">
            Tal vez quieras volver al {' '}
            <Link className=" text-indigo-500 font-bold" to={'/'}>Inicio</Link>
          </p>
        ) : (
          <p className="mt-10 text-center font-roboto font-light">
            Tal vez quieras volver al {' '}
            <Link className=" text-indigo-500 font-bold" to={'/auth/login'}>Inicio de Sesión</Link>
          </p>
        )}
    </>
  );
}