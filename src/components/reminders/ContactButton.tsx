import { ListActions } from "@/reducers/customerReducer";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";

type ContactButtonProps = {
  dispatch: Dispatch<ListActions>;
};

export default function ContactButton({dispatch}: ContactButtonProps) {
  const handleContact = () => {
    dispatch({ type: 'show-edit' });
  };
  return (
    <>
      <button
        type="button"
        className="w-full flex flex-row justify-center items-center gap-2 bg-green-600 hover:bg-green-700 transition-all ease-in-out duration-300 text-xs font-bold uppercase text-white rounded-sm mx-auto p-2 mt-2"
        onClick={handleContact}
        title="Contactar Cliente"
      >
        <ChatBubbleBottomCenterIcon className="w-4 h-4 text-white" />
        Contactar
      </button>
    </>
  );
}