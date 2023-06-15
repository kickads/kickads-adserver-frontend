import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../config';
import { useStore } from '../../../state/store';
import { User } from '../../../models';
import { List } from '../../../components';

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
  { id: 1, name: 'Admin', path: 'admin' },
  { id: 2, name: 'Operations', path: 'operations' },
  { id: 3, name: 'Client services', path: 'client-services' },
  { id: 4, name: 'Comercial', path: 'comercial' },
  { id: 5, name: 'Finance', path: 'finance' },
  { id: 6, name: 'Guest', path: 'guest' },
];

export function AdminUsers() {
  const userToken = useStore(state => state.userToken);
  const userAuth = useStore(state => state.user);
  const { data } = useQuery({
    queryKey: [ 'users' ],
    queryFn: () => getAllUsers(userToken)
  });

  if (!data) return <h1>Loading users...</h1>;

  return (
    <>
      <h2>AdminUsers</h2>
      <section className="p-3">
        <h3>Usuarios</h3>
        <ul className="flex flex-col gap-4 font-inter">
          {
            data.users.map(user => user.id !== userAuth?.id && (
              <li key={ user.id } className="flex items-center gap-3">
                <span className="block w-10 rounded-full overflow-hidden">
                  <img src={ user.avatar ?? '' } alt={ user.name } />
                </span>
                <span className="text-xs">{ user.name } - { user.email }</span>
                <span>
                  <List
                    items={ roles }
                    currentItem={ { id: user.id, name: user.role } }
                    url={ `users/${ user.id }` }
                    fieldToUpdate="role"
                  />
                </span>
              </li>
            ))
          }
        </ul>
      </section>
    </>
  );
}