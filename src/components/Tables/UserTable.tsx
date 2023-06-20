import { User } from '../../models/User/user.model.ts';
import { List } from '../List/List.tsx';

interface Props {
  users: User[]
}

const roles = [
  { id: 1, name: 'Admin', path: 'admin' },
  { id: 2, name: 'Operations', path: 'operations' },
  { id: 3, name: 'Client services', path: 'client-services' },
  { id: 4, name: 'Comercial', path: 'comercial' },
  { id: 5, name: 'Finance', path: 'finance' },
  { id: 6, name: 'Guest', path: 'guest' },
];

export function UserTable({ users }: Props) {
  console.log(users);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Role
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              { users.map((user) => (

                <tr key={ user.id }>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0">
                        <img className="h-11 w-11 rounded-full" src={ user.avatar ?? '' } alt={ user.name } />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{ user.name }</div>
                        <div className="mt-1 text-gray-500">{ user.email }</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
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
          </div>
        </div>
      </div>
    </div>
  );
}