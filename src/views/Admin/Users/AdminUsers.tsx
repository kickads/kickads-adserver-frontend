import { useQuery } from '@tanstack/react-query';
import { useStore } from '../../../state/store/store.tsx';
import { User } from '../../../models/User/user.model.ts';
import { axiosInstance } from '../../../config/axios/axios.config.ts';
import { List } from '../../../components/List/List.tsx';
import { UserIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Loader } from '../../../components/Loader/Loader.tsx';

export interface UsersResponse {
  status: string;
  data: Data;
}

export interface Data {
  users: User[];
}

async function getAllUsers(userToken: string | null) {
  const { data: { data: users } } = await axiosInstance.get<UsersResponse>('users', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return users;
}

const roles = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'operations' },
  { id: 3, name: 'client services' },
  { id: 4, name: 'commercial' },
  { id: 5, name: 'finance' },
  { id: 6, name: 'guest' },
];

export function AdminUsers() {
  const [ usersFiltered, setUsersFiltered ] = useState<User[]>([]);
  const userToken = useStore(state => state.userToken);
  const { data } = useQuery({
    queryKey: [ 'users' ],
    queryFn: () => getAllUsers(userToken)
  });

  useEffect(() => {
    if (data?.users) setUsersFiltered(data.users);
  }, [ data ]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersFiltered(data?.users.filter(user => user.name.toLowerCase().includes(e.target.value)) ?? []);
  };

  return (
    <section className="flex flex-col gap-10 min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-60px)] py-6">

      {/* Buscador de usuarios */}
      <div className="max-w-md w-full mx-auto">
        <label htmlFor="email" className="sr-only">
          Buscar usuarios
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UsersIcon className="h-5 w-5 text-gray-400 dark:stroke-slate-300" aria-hidden="true" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-300 dark:ring-slate-700"
              placeholder="Buscar..."
              autoComplete="off"
              onChange={ handleOnChange }
            />
          </div>
        </div>
      </div>

      {
        data?.users
          ? <table className="w-full max-w-md mx-auto">
            <thead className="sr-only">
            <tr className="font-inter text-gray-600">
              <th className="py-3 px-2 text-left">Usuario</th>
              <th className="py-3 px-2 text-left">Rol</th>
            </tr>
            </thead>
            <tbody>
            { usersFiltered.map(user => (
              <tr key={ user.id }>
                <td className="whitespace-nowrap py-5 text-sm sm:pl-0">
                  <div className="flex items-center">
                    <div className="w-10 flex-shrink-0">
                      {
                        user.avatar
                          ? <img className="rounded-full" src={ user.avatar } alt={ user.name } />
                          : <UserIcon className="h-9 mx-auto dark:stroke-white" />
                      }
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 dark:text-white">{ user.name }</div>
                      <div className="mt-1 text-gray-500 dark:text-slate-400">{ user.email }</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap py-5 text-sm text-gray-500">
                  <List
                    items={ roles }
                    currentItem={ { id: user.id, name: user.role } }
                    url={ `users/${ user.id }` }
                    fieldToUpdate="role"
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          : <Loader className="h-6 stroke-slate-300 animate-spin" />
      }

    </section>
  );
}