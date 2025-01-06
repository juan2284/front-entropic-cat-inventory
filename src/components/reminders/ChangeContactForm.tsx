import { RemindersFilterView } from "@/types/types";
import { contactResultsTranslation } from "@/utils/es";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../globals/ErrorMessage";

type ChangeContactFormProps = {
  register: UseFormRegister<RemindersFilterView>;
  errors: FieldErrors<RemindersFilterView>;
};

export default function ChangeContactForm({register, errors}: ChangeContactFormProps) {
  const results = Object.keys(contactResultsTranslation);
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <label htmlFor="contact" className="w-full text-sm font-bold text-slate-700 gap-2 p-1">
          Resultado del Contacto
        </label>
        <select
          id="contact"
          className="w-full border border-gray-200 rounded-sm text-xs font-roboto p-1 text-gray-600"
          {...register("contact")}
        >
          <option value={''} disabled>Seleccione</option>
          {results.map(result => (
            <option value={result} key={result}>{contactResultsTranslation[result]}</option>
          ))}
        </select>
        {errors.contact && (
          <ErrorMessage>{errors.contact?.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}