import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../config';
import { useStore } from '../../../state/store';
import { User } from '../../../models';

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
  'admin',
  'operations',
  'client services',
  'comercial',
  'finance',
  'guest',
];

export function AdminUsers() {
  const userToken = useStore(state => state.userToken);
  const { data } = useQuery({
    queryKey: [ 'users' ],
    queryFn: () => getAllUsers(userToken)
  });

  const rolChange = async (userId: number, userRole: string) => {
    console.log(`usuario ${ userId } ha cambiado de rol a: ${ userRole }`);

    const res = await axiosInstance.patch(`users/${ userId }`, {
      role: userRole
    }, {
      headers: {
        'Authorization': `Bearer ${ userToken }`
      }
    });

    console.log(res);
  }

  if (!data) return <h1>Loading users...</h1>;

  return (
    <>
      <h2>AdminUsers</h2>
      <section className="p-3">
        <h3>Usuarios</h3>

        <ul className="flex flex-col gap-4 font-inter">
          {
            data.users.map(user => (
              <li key={ user.id } className="flex items-center gap-3">
                <span className="block w-10 rounded-full overflow-hidden">
                  <img src={ user.avatar ?? '' } alt={ user.name } />
                </span>
                <span className="text-xs">{ user.name } - { user.email }</span>
                <span>
                  <label htmlFor="role" className="sr-only">Rol</label>
                  <select
                    id="role"
                    name="role"
                    autoComplete={ user.role }
                    defaultValue={ user.role }
                    onChange={ (e) => rolChange(user.id, e.target.value) }
                    className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {
                      roles.map(role => (
                        <option
                          key={ role }
                          value={ role }
                        >{ role }</option>
                      ))
                    }
                  </select>
                </span>
              </li>
            ))
          }
        </ul>

      </section>
    </>
  );
}