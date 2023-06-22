import { UserIcon } from '@heroicons/react/24/outline';
import { List } from '../../../../components/List/List.tsx';
import { User } from '../../../../models/User/user.model.ts';

interface Props {
  users: User[]
}

const roles = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'operations' },
  { id: 3, name: 'client services' },
  { id: 4, name: 'commercial' },
  { id: 5, name: 'finance' },
  { id: 6, name: 'guest' },
];

export function UsersTable({ users }: Props) {
  return (
    <table className="w-full max-w-md mx-auto">
      <thead className="sr-only">
      <tr className="font-inter text-gray-600">
        <th className="py-3 px-2 text-left">Usuario</th>
        <th className="py-3 px-2 text-left">Rol</th>
      </tr>
      </thead>
      <tbody>
      { users.map(user => (
        <tr key={ user.id }>
          <td className="whitespace-nowrap py-5 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="w-10 flex-shrink-0">
                {
                  user.avatar
                    ? <img className="rounded-full" src={ user.avatar } alt={ user.name }/>
                    : <UserIcon className="h-9 mx-auto dark:stroke-white"/>
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
      )) }
      </tbody>
    </table>
  );
}