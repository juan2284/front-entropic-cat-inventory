import AddChargeForm from "@/components/charges/AddChargeForm";
import { ListActions } from "@/reducers/customerReducer";
import { Dispatch } from "react";
import { Link } from "react-router-dom";

type AddChargeViewProps = {
  dispatch: Dispatch<ListActions>;
};

export default function AddChargeView({dispatch}: AddChargeViewProps) {
  return (
    <>
      <main className="p-4">
        <section className="rounded-sm p-2 border border-gray-200 mb-4">
          <article>
            <div className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Agregar Pago:</h4>
              <Link
                to={'/pagos'}
                className="w-1/5 bg-indigo-600 text-xs font-roboto text-center hover:bg-indigo-700 p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
                onClick={() => { dispatch({ type: 'show-details', payload: { result: false } }); dispatch({ type: 'clear-states' }) }}
              >
                Regresar
              </Link>
            </div>

            <AddChargeForm />
          </article>
        </section>
      </main>
    </>
  );
}