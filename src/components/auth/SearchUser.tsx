import { ListActions } from "@/reducers/customerReducer";
import { Users } from "@/types/types";
import { ChangeEvent, Dispatch } from "react";

type SearchUserProps = {
  users: Users;
  dispatch: Dispatch<ListActions>;
};

export default function SearchUser({users, dispatch}: SearchUserProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    dispatch({ type: 'search-user', payload: { search, data: users } });
  };
  return (
    <>
      <nav className="w-full border-b border-b-gray-200 p-4 flex flex-row justify-between items-center">
        <h4 className="text-2xl font-light font-oswald text-gray-600">Usuarios</h4>

        <div className="w-full md:w-1/3">
          <div className="flex flex-row justify-center items-center">
            <label
              className="flex items-center px-3 py-[0.25rem] text-surface [&>svg]:h-5 [&>svg]:w-5"
              htmlFor="searchBar"
              title="Buscar Usuario"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="#4f46e5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </label>
            <input
              id="searchBar"
              type="text"
              className="w-full p-1 text-xs text-gray-500 rounded-full border border-solid border-gray-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-gray-400 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
              placeholder={`Buscar Usuario por Email o Nombre`}
              onChange={handleChange}
            />
          </div>
        </div>
      </nav>
    </>
  );
}