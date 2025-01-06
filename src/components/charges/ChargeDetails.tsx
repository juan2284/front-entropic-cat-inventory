import { Charge } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { paidStatusTranslations } from "@/utils/es";
import { formatCurrency, formatCurrencyLocal } from "@/utils/formatCurrency";
import { CalendarDateRangeIcon, CheckBadgeIcon, ClipboardDocumentListIcon, Squares2X2Icon, TruckIcon } from "@heroicons/react/20/solid";
import StockActivateButton from "./StockActivateButton";

type ChargeDetailsProps = {
  charge: Charge;
};

export default function ChargeDetails({charge}: ChargeDetailsProps) {
  return (
    <>
      <section className={`w-full`}>
        <main className="flex flex-col justify-center items-center gap-2">
          <div className="w-full grid grid-cols-3 gap-2 border-b border-b-gray-300 p-2">
            
            <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
              <TruckIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <h5 className="font-bold text-gray-600 text-md">Proveedor:</h5>
                <p className="text-gray-500 text-xs">{charge.supplier.name} {charge.supplier.last_name}</p>
                <p className="text-gray-500 text-xs">{charge.supplier.telephone}</p>
                <p className="text-gray-500 text-xs">{charge.supplier.email}</p>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
              <Squares2X2Icon className="w-8 h-8 text-indigo-600" />
              <div>
                <h5 className="font-bold text-gray-600 text-md">Cantidad:</h5>
                <p className="text-gray-500 text-xs">{charge.product.quantity} Unidades</p>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
              <CalendarDateRangeIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <h5 className="font-bold text-gray-600 text-md">Fecha de Adquisición:</h5>
                <p className="text-gray-500 text-xs">{formatDate(charge.settlement_date)}</p>
                <p className="text-gray-500 text-xs">Monto Total: {formatCurrencyLocal(charge.total_amount)}</p>
                <p className="text-gray-500 text-xs">Monto Pendiente: {formatCurrencyLocal(charge.pending_amount)}</p>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
              <ClipboardDocumentListIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <h5 className="font-bold text-gray-600 text-md">Detalles de la Compra:</h5>
                <p className="text-gray-500 text-xs">Pago: {formatCurrencyLocal(charge.amount_one)}</p>
                <p className="text-gray-500 text-xs">Pago en $: {formatCurrency(charge.amount_two)}</p>
                <p className="text-gray-500 text-xs">Pago con Tarjeta: {formatCurrencyLocal(charge.amount_three)}</p>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center gap-2 rounded-sm py-4 px-2 bg-gray-100 font-roboto font-light shadow-md">
              <CheckBadgeIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <h5 className="font-bold text-gray-600 text-md">Estatus de Pago:</h5>
                <p className={`${charge.status === 'paid' ? 'text-green-600' : 'text-red-600'} font-bold text-xs uppercase`}>{paidStatusTranslations[charge.status]}</p>
              </div>
            </div>

            <StockActivateButton chargeId={charge._id} />

          </div>
        </main>
      </section>
    </>
  );
}