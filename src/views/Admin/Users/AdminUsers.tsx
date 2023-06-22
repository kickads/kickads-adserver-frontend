import { Loader } from '../../../components/Loader/Loader.tsx';
import { useUsersFiltered } from './hooks/useUsersFiltered.ts';
import { UsersTable } from './components/UsersTable.tsx';
import { UserSearchBar } from './components/UserSearchBar.tsx';
import { User } from '../../../models/User/user.model.ts';

export interface UsersResponse {
  status: string;
  data: Data;
}

export interface Data {
  users: User[];
}

export function AdminUsers() {
  const { usersFiltered, handleUserOnChange } = useUsersFiltered();

  return (
    <section className="flex flex-col gap-10 min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-60px)] py-6">

      <UserSearchBar  handleUserOnChange={ handleUserOnChange } />

      {
        usersFiltered.length > 0
          ? <UsersTable  users={ usersFiltered }/>
          : <Loader className="h-6 stroke-slate-300 animate-spin" />
      }

    </section>
  );
}