import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { Search } from '../../../../components/Search/Search.tsx';
import { SearchTable } from '../components/SearchTable/SearchTable.tsx';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { useSearchByName } from '../../../../hooks/useSearch.ts';
import { getAllEntities } from '../../../../services/entities/entities.services.ts';
import { useCrudMutation } from '../hooks/useCrudMutation.ts';

interface Data {
  entities: [];
}

export function Entities() {
  const loaderData = useLoaderData() as Data;
  const { data } = useQuery({ queryKey: [ 'entities' ], queryFn: getAllEntities });
  const { search, handleSearchChange } = useSearchByName(data ?? []);

  useCrudMutation({
    crudPath: 'entities',
    crudQueryKey: 'entities'
  });

  return (
    <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
      <Await resolve={ loaderData.entities }>
        <div className="animate__animated animate__fadeIn flex flex-col gap-6">
          <Search handleSearchChange={ handleSearchChange } />
          <SearchTable searchItems={ search } />
        </div>
      </Await>
    </Suspense>
  );
}

export async function getAllEntitiesLoader() {
  return defer({
    entities: queryClient.fetchQuery({
      queryKey: [ 'entities' ],
      queryFn: getAllEntities
    })
  });
}