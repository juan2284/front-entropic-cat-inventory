import { Stocktaking } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";
import { BanknotesIcon, CalendarDateRangeIcon, CheckBadgeIcon, ClipboardDocumentListIcon, CurrencyDollarIcon, PowerIcon, ShoppingCartIcon, Squares2X2Icon, TruckIcon } from "@heroicons/react/20/solid";

type StockLayoutProps ={
  stock: Stocktaking;
};

export default function StockLayout({stock}: StockLayoutProps) {
  return (
    <>
      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <TruckIcon className="w-8 h-8 text-indigo-600" />
        <div>
          <h5 className="font-bold text-gray-600 text-md">Proveedor:</h5>
          <p className="text-gray-500 text-xs">{stock.supplier.name} {stock.supplier.last_name}</p>
          <p className="text-gray-500 text-xs">{stock.supplier.telephone}</p>
          <p className="text-gray-500 text-xs">{stock.supplier.email}</p>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <CurrencyDollarIcon className="w-8 h-8 text-indigo-600" />
        <div>
          <h5 className="font-bold text-gray-600 text-md">Precios Unitarios:</h5>
          <p className="text-gray-500 text-xs">{formatCurrencyLocal(stock.price_one)}</p>
          <p className="text-gray-500 text-xs">{formatCurrency(stock.price_two)}</p>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <BanknotesIcon className="w-8 h-8 text-indigo-600" />
        <div>
          <h5 className="font-bold text-gray-600 text-md">Unidades y Valor Total:</h5>
          <p className="text-gray-500 text-xs">{stock.quantity} Unidades</p>
          <p className="text-gray-500 text-xs">{formatCurrencyLocal(stock.quantity * stock.price_one)}</p>
          <p className="text-gray-500 text-xs">{formatCurrency(stock.quantity * stock.price_two)}</p>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <CalendarDateRangeIcon className="w-8 h-8 text-indigo-600" />
        <div>
          <h5 className="font-bold text-gray-600 text-md">Fecha de Adquisición:</h5>
          <p className="text-gray-500 text-xs">{formatDate(stock.charge.settlement_date)}</p>
          <p className="text-gray-500 text-xs">Monto Total: {formatCurrencyLocal(stock.charge.total_amount)}</p>
          <p className="text-gray-500 text-xs">Monto Pendiente: {formatCurrencyLocal(stock.charge.pending_amount)}</p>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <ClipboardDocumentListIcon className="w-8 h-8 text-indigo-600" />
        <div>
          <h5 className="font-bold text-gray-600 text-md">Detalles de la Compra:</h5>
          <p className="text-gray-500 text-xs">Pago: {formatCurrencyLocal(stock.charge.amount_one)}</p>
          <p className="text-gray-500 text-xs">Pago en $: {formatCurrency(stock.charge.amount_two)}</p>
          <p className="text-gray-500 text-xs">Pago con Tarjeta: {formatCurrencyLocal(stock.charge.amount_three)}</p>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <CheckBadgeIcon className="w-8 h-8 text-indigo-600" />
        <div>
          <h5 className="font-bold text-gray-600 text-md">Estatus del Pago del Stock:</h5>
          <p className={`${stock.charge.status === 'paid' ? 'text-green-600' : 'text-red-600'} font-bold text-xs uppercase`}>{paidStatusTranslations[stock.charge.status]}</p>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <Squares2X2Icon className="w-8 h-8 text-indigo-600" />
        <div className="w-full">
          <h5 className="font-bold text-gray-600 text-md text-center">Existencia Parcial:</h5>
          <p className={`${(stock.remaining / stock.quantity) * 100 <= 15 ? 'text-red-600' : (stock.remaining / stock.quantity) * 100 >= 15 && (stock.remaining / stock.quantity) * 100 <= 50 ? 'text-amber-500' : 'text-teal-600'} text-xs text-center font-bold`}>{stock.remaining}</p>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <ShoppingCartIcon className="w-8 h-8 text-indigo-600" />
        <div className="w-full">
          <h5 className="font-bold text-gray-600 text-md text-center">Ventas Parciales:</h5>
          <p className={`text-gray-500 text-md text-center font-bold`}>{stock.quantity - stock.remaining}</p>
        </div>
      </div>

      <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
        <PowerIcon className="w-8 h-8 text-indigo-600" />
        <div className="w-full">
          <h5 className="font-bold text-gray-600 text-md text-center">Estatus del Inventario:</h5>
          <p className={`${stock.stock_out === true ? 'text-green-600' : 'text-red-600'} text-xl text-center font-bold`}>{stock.stock_out === true ? 'Activo' : 'Inactivo'}</p>
        </div>
      </div>
    </>
  );
}