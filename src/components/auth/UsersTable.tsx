import { ListActions } from "@/reducers/customerReducer";
import { User, Users } from "@/types/types";
import { Dispatch } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { rolesListTranslations } from "@/utils/es";

type UsersTableProps = {
  state: {
    viewEditCustomer: boolean;
    viewDeleteCustomer: boolean;
    viewDetailsCustomer: boolean;
    userDetails: User;
  },
  users: Users;
  dispatch: Dispatch<ListActions>;
};

export default function UsersTable({state, users, dispatch}: UsersTableProps) {
  const handleDelete = (user: User) => {
    dispatch({ type: 'set-user-details', payload: { user } });
    dispatch({ type: 'show-delete' });
  };

  return (
    <>
      <table className='w-full text-xs text-center'>
        <thead>
          <tr className='text-xs font-roboto text-gray-500'>
            <th className='font-light p-2 bg-gray-100'>Nombres</th>
            <th className='font-light p-2 bg-gray-100'>Email</th>
            <th className='font-light p-2 bg-gray-100'>Permisos</th>
            <th className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} font-light p-2 bg-gray-100`}>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {users.length !== 0 ? (
            <>
              {users.map(user => (
                <tr className={`${user._id === state.userDetails._id && state.viewEditCustomer ? 'text-red-600' : 'text-gray-600'} border-b border-b-gray-300 font-bold`} key={user._id}>
                  <td className='p-2'>{user.name}</td>
                  <td className='p-2'>{user.email}</td>
                  <td className='p-2'>{rolesListTranslations[user.role]}</td>
                  <td className={`${state.viewDetailsCustomer || state.viewDeleteCustomer ? 'hidden' : ''} p-2`}>
                    <button
                      type="button"
                      className="w-full text-gray-100 flex justify-center items-center font-bold group"
                      onClick={() => handleDelete(user)}
                      title="Eliminar"
                    >
                      <XCircleIcon className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-all ease-in-out duration-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
}