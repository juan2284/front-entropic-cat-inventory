import { confirmAccount } from "@/api/AuthAPI";
import { ConfirmToken } from "@/types/types"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('');
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/auth/login');
    }
  });

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };
  const handleComplete = (token: ConfirmToken['token']) => mutate({ token });
  return (
    <>
      <section className="p-4">
        <article className="rounded-sm py-10 border border-gray-200">
          <div className="flex flex-col justify-between items-center">
            <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Confirmar Usuario</h4>

            <form
              className="space-y-8 p-2 bg-white"
            >
              <label
                className="font-normal text-xl text-center block font-roboto text-indigo-600"
              >Ingrese el código de 6 dígitos</label>
              <div className="flex justify-center gap-5">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                  <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                  <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                </PinInput>
              </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
              <Link
                to='/auth/solicitar-codigo'
                className="text-center font-roboto text-xs text-gray-400 font-normal hover:text-gray-500 transition-all ease-in-out duration-300"
              >
                Solicitar un nuevo Código
              </Link>
            </nav>
          </div>
        </article>
      </section>
    </>
  );
}