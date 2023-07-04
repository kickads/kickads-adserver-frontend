import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '../../../../services/roles/role.services.ts';
import { useSearchByName } from '../../../../hooks/useSearch.ts';
import { useCrudMutation } from '../hooks/useCrudMutation.ts';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { Search } from '../../../../components/Search/Search.tsx';
import { SearchTable } from '../components/SearchTable/SearchTable.tsx';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { AlertInfo } from '../../../../components/Alerts/AlertInfo.tsx';

interface Data {
  roles: [];
}


export function Roles() {
  const loaderData = useLoaderData() as Data;
  const { data } = useQuery({ queryKey: [ 'roles' ], queryFn: getAllRoles });
  const { search, handleSearchChange } = useSearchByName(data ?? []);

  useCrudMutation({
    crudPath: 'roles',
    crudQueryKey: 'roles'
  });

  return (
    <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
      <Await resolve={ loaderData.roles }>
        <div className="animate__animated animate__fadeIn flex flex-col gap-6">
          <Search handleSearchChange={ handleSearchChange } />
          {
            search.length
              ? <SearchTable searchItems={ search } />
              : <AlertInfo text="No se encontraron coincidencias." />
          }
        </div>
      </Await>
    </Suspense>
  );
}

export async function getAllRolesLoader() {
  return defer({
    roles: queryClient.fetchQuery({
      queryKey: [ 'roles' ],
      queryFn: getAllRoles
    })
  });
}