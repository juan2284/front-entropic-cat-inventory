import { ListActions } from "@/reducers/customerReducer";
import { Stocktaking, Stocktakings } from "@/types/types";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrencyLocal } from "@/utils/formatCurrency";
import { PencilSquareIcon, QueueListIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";
import { useNavigate } from "react-router-dom";

type StocksTableProps = {
  state: {
    searchStock: Stocktakings;
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    stockDetails: Stocktaking;
  },
  stocks: Stocktakings;
  dispatch: Dispatch<ListActions>;
};

export default function StocksTable({state, stocks, dispatch}: StocksTableProps) {
  const navigate = useNavigate();

  const handleEdit = (stock: Stocktaking) => {
    dispatch({ type: 'set-stock-details', payload: { stock } });
    dispatch({ type: 'show-edit' });
  };

  const handleDetails = (stock: Stocktaking) => {
    dispatch({ type: 'set-stock-details', payload: { stock } });
    dispatch({ type: 'show-details', payload: { result: true } });
    navigate(`/inventario/${stock._id}`);
  };
  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Producto</th>
            <th className='font-light p-2 bg-gray-100'>Código</th>
            <th className='font-light p-2 bg-gray-100'>Proveedor</th>
            <th className='font-light p-2 bg-gray-100'>Cantidad</th>
            <th className='font-light p-2 bg-gray-100'>Monto de Compra</th>
            <th className='font-light p-2 bg-gray-100'>Estatus de Compra</th>
            <th className='font-light p-2 bg-gray-100'>Monto Pendiente</th>
            <th className='font-light p-2 bg-gray-100'>Ventas</th>
            <th className='font-light p-2 bg-gray-100'>Existencia</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Detalles</th>
            <th className={`${state.viewEditCustomer || state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Editar</th>
          </tr>
        </thead>

        <tbody>
          {stocks.length !== 0 ? (
            <>
              {stocks.map(stock => (
                <tr className={`${stock._id === state.stockDetails._id && state.viewEditCustomer ? 'text-red-600' : 'text-gray-600'} border-b border-b-gray-300 font-bold`} key={stock._id}>
                  <td className='p-2'>{stock.product.name}</td>
                  <td className='p-2'>{stock.product.code}</td>
                  <td className='p-2'>{stock.supplier.name}</td>
                  <td className='p-2'>{stock.quantity}</td>
                  <td className='p-2'>{formatCurrencyLocal(stock.charge.total_amount)}</td>
                  <td className={`${stock.charge.status === 'paid' ? 'text-green-600' : 'text-red-600'} p-2`}>{paidStatusTranslations[stock.charge.status]}</td>
                  <td className='p-2'>{formatCurrencyLocal(stock.charge.pending_amount)}</td>
                  <td className='p-2'>{stock.quantity - stock.remaining}</td>
                  <td className={`${(stock.remaining / stock.quantity) * 100 <= 15 ? 'text-red-600' : (stock.remaining / stock.quantity) * 100 >= 15 && (stock.remaining / stock.quantity) * 100 <= 50 ? 'text-amber-500' : 'text-teal-600'} p-2`}>{stock.remaining}</td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-400 flex justify-center items-center font-bold group"
                      onClick={() => handleDetails(stock)}
                      title="Detalles"
                    >
                      <QueueListIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer || state.viewEditCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className={`w-full text-gray-400 flex justify-center items-center font-bold group`}
                      onClick={() => handleEdit(stock)}
                      title="Editar"
                    >
                      <PencilSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}