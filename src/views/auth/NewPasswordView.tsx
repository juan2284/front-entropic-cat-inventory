import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { ConfirmToken } from "@/types/types";
import { useState } from "react";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
      <section className="p-4">
        <article className="rounded-sm py-10 border border-gray-200">
          <div className="flex flex-col justify-between items-center">
            <h4 className="py-2 text-xl font-oswald text-gray-600 mb-2">Reestablecer Password</h4>

            {!isValidToken ?
              <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> :
              <NewPasswordForm token={token} />
            }
          </div>
        </article>
      </section>      
    </>
  );
}