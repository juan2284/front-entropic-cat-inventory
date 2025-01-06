
type ChargeBarProps = {
  data: {
    transactions: number;
    paid: number;
    pending: number;
  }
};

export default function ChargeBar({data}: ChargeBarProps) {
  const inPaid = Math.floor((data.paid/data.transactions)*100);
  const inPending = Math.floor((data.pending/data.transactions)*100);
  return (
    <>
      <h5 className="text-xl font-bold font-roboto text-gray-500">{data.transactions} <span className="text-xs align-middle font-light">Transacciones</span></h5>
      <div className="w-full h-2 bg-gray-200 rounded-full relative">
        <div className={`w-full flex flex-row justify-start items-center h-full absolute rounded-full cursor-pointer`}>
          <div className="bg-teal-500 h-full rounded-full hover:scale-x-110 transition-all ease-in-out duration-300" title="Cuentas Pagadas" style={{ width: `${inPaid}%` }}></div>
          <div className="bg-red-600 h-full rounded-full hover:scale-x-110 transition-all ease-in-out duration-300" title="Cuentas sin Pagar" style={{ width: `${inPending}%` }}></div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-start gap-3 p-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500"></div>
          <p className="text-xs text-gray-500 font-light">Cuentas Pagadas: <span className="font-bold">{data.paid}</span></p>
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
          <p className="text-xs text-gray-500 font-light">Cuentas por Pagar: <span className="font-bold">{data.pending}</span></p>
        </div>
      </div>
    </>
  );
}