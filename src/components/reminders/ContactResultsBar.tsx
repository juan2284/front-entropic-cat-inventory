import { ResultsContactsCountType } from "@/types/types";
import { contactResultsTranslation } from "@/utils/es";

type ContactResultsBarProps = {
  data: ResultsContactsCountType[];
};

export default function ContactResultsBar({data}: ContactResultsBarProps) {
  let quantityService = 0;
  data.map(result => {
    result.quantity ? quantityService += result.quantity : quantityService += 0;
  });
  return (
    <>
      <h5 className="font-roboto text-gray-500"><span className="text-xs align-middle font-light">Recordatorios según su Contacto</span></h5>

      <div className="w-full flex flex-row flex-wrap justify-center items-start gap-1 p-2">
        {data.map(contact => (
          <div className="flex flex-row justify-center items-center gap-2" key={contact.contactResult}>
            <div className="w-full rounded-[2px] font-roboto cursor-pointer">
              <p className={`${
                contact.contactResult === 'pending' ? 'bg-amber-200 hover:bg-amber-300' :
                contact.contactResult === 'contacted' ? 'bg-green-200 hover:bg-green-300' :
                'bg-red-200 hover:bg-red-300'
              } text-left text-xs font-light py-1 px-3 rounded-[2px] transition-all ease-in-out duration-300`}>{contactResultsTranslation[contact.contactResult]}: <span className={`${
                contact.contactResult === 'pending' ? 'text-amber-600' :
                contact.contactResult === 'contacted' ? 'text-green-600' :
                'text-red-600'
              } font-bold`}>{contact.quantity}</span></p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}