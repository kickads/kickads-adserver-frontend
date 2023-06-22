import { Suspense, useEffect, useState } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../../../components/Loader/Loader.tsx';
import { UsersTable } from './components/UsersTable.tsx';
import { UserSearchBar } from './components/UserSearchBar.tsx';
import { getAllUsers } from '../../../services/user/user.services.ts';
import { queryClient } from '../../../providers/ReactQueryProvider.tsx';
import { User } from '../../../models/User/user.model.ts';

export interface UsersResponse {
  status: string;
  data: Data;
}

export interface Data {
  users: User[];
}

export function AdminUsers() {
  const loaderData = useLoaderData() as Data;
  const { data } = useQuery({ queryKey: [ 'users' ], queryFn: getAllUsers });
  const [ usersFiltered, setUsersFiltered ] = useState<User[]>([]);

  useEffect(() => {
    if (data) setUsersFiltered(data);
  }, [ data ]);

  return (
    <section className="flex flex-col gap-10 min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-60px)] py-6">

      <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
        <Await resolve={ loaderData.users }>
          { (users) => (
            <div className="animate__animated animate__fadeIn">
              <UserSearchBar setUsersFiltered={ setUsersFiltered } users={ users }/>
              <UsersTable users={ usersFiltered } />
            </div>
          ) }
        </Await>
      </Suspense>

    </section>
  );
}

export async function getAllUsersLoader() {
  return defer({
    users: queryClient.fetchQuery({
      queryKey: [ 'users' ],
      queryFn: getAllUsers
    })
  });
}