import { createAccount } from "@/api/AuthAPI";
import DeleteUserModal from "@/components/auth/DeleteUserModal";
import RegisterForm from "@/components/auth/RegisterForm";
import SearchUser from "@/components/auth/SearchUser";
import UsersTable from "@/components/auth/UsersTable";
import Loader from "@/components/globals/Loader";
import { useUsers } from "@/hooks/authHooks/useUsers";
import { ListActions } from "@/reducers/customerReducer";
import { User, UserRegistrationForm, Users } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type RegisterViewProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    userDetails: User;
    searchUser: Users;
    usersFilter: string;
    users: Users;
  },
  dispatch: Dispatch<ListActions>;
};

export default function RegisterView({state, dispatch}: RegisterViewProps) {
  const { data, isLoading, isError } = useUsers();
  const users = state?.users.length !== 0 ? state?.users : data;
  const usersToView: Users | undefined = state.usersFilter === 'todos' ? users : users?.filter(user => user.role === state.usersFilter);
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: '',
  };
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['users']});
      toast.success(data);
      reset();
    }
  });
  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  if (isError) return (<h4 className="text-xs font-roboto text-gray-600 font-bold">Error con la Base de Datos</h4>);
  if (isLoading) return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white bg-opacity-15">
      <Loader />
    </div>
  );
  if (data) return (
    <>
      <header>
        <SearchUser users={data} dispatch={dispatch} />
      </header>

      <main className="p-4">
        {state?.searchUser && state.searchUser.length !== 0 && (
          <section className="rounded-sm p-2 border border-gray-200 mb-4">
            <article>
              <h4 className="py-2 text-xl font-oswald text-gray-600">Resultados de la Búsqueda:</h4>
              <UsersTable state={state!} users={state.searchUser} dispatch={dispatch} />
            </article>
          </section>
        )}

        <section className="rounded-sm p-2 border border-gray-200 mb-4">
          <article>
            <header className="flex flex-row justify-between items-center">
              <h4 className="py-2 text-xl font-oswald text-gray-600">Crear Usuario</h4>
            </header>            

            <form
              onSubmit={handleSubmit(handleRegister)}
              className="w-1/2 p-3 m-auto font-roboto"
              noValidate
            >
              
              <RegisterForm register={register} errors={errors} watch={watch} />

              <input
                type="submit"
                value='Registrar'
                className="bg-indigo-600 text-xs font-roboto mt-2 hover:bg-indigo-700 w-full p-2 text-white uppercase font-bold cursor-pointer rounded-sm transition-all ease-in-out duration-300"
              />
            </form>
          </article>
        </section>

        <section className="rounded-sm p-2 border border-gray-200 mb-4">
          <header className={`w-full flex flex-row justify-center items-center gap-2 mb-2 transition-all ease-in-out duration-500`}>
            <button
              className={`flex flex-row justify-between items-center gap-1 p-2 bg-green-600 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-green-700 transition-all ease-in-out duration-300 relative`}
              onClick={() => dispatch({ type: 'filter-users', payload: { filter: 'todos' } })}
              title="Filtrar Usuarios"
            >
              <div className={`${state?.usersFilter !== 'todos' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
              Todos
            </button>

            <button
              className={`flex flex-row justify-between items-center gap-1 p-2 bg-indigo-700 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-800 transition-all ease-in-out duration-300 relative`}
              onClick={() => dispatch({ type: 'filter-users', payload: { filter: 'admin' } })}
              title="Administrador"
            >
              <div className={`${state?.usersFilter !== 'admin' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
              Administrador
            </button>

            <button
              className={`flex flex-row justify-between items-center gap-1 p-2 bg-indigo-700 text-white rounded-sm font-semibold font-roboto text-xs hover:bg-indigo-800 transition-all ease-in-out duration-300 relative`}
              onClick={() => dispatch({ type: 'filter-users', payload: { filter: 'regular' } })}
              title="Usuario"
            >
              <div className={`${state?.usersFilter !== 'regular' ? 'hidden' : ''} absolute w-3 h-3 bg-indigo-500 rounded-full -top-1 -end-1 border-2 border-white`}></div>
              Usuario
            </button>
          </header>

          <article>
            <UsersTable state={state} users={usersToView!} dispatch={dispatch} />
          </article>
        </section>
      </main>

      <DeleteUserModal state={state!} dispatch={dispatch} />
    </>
  );
}