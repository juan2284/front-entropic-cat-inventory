import { validateToken } from "@/api/AuthAPI";
import { ConfirmToken } from "@/types/types"
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
  token: ConfirmToken['token'];
  setToken: Dispatch<SetStateAction<string>>;
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
};

export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsValidToken(true);
      navigate('/auth/login');
    }
  });
  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };
  const handleComplete = (token: ConfirmToken['token']) => mutate({ token });
  return (
    <>
      <form
        className="space-y-8 p-2 bg-white"
      >
        <label
          className="font-normal text-xl text-center block font-roboto text-indigo-600"
        >Ingrese el código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/recuperar-password'
          className="text-center font-roboto text-xs text-gray-400 font-normal hover:text-gray-500 transition-all ease-in-out duration-300"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}