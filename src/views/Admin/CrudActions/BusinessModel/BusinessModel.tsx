import { Await, defer, useLoaderData } from 'react-router-dom';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { getAllBusinessModels } from '../../../../services/businessModel/businessModel.services.ts';
import { useQuery } from '@tanstack/react-query';
import { useSearchByName } from '../../../../hooks/useSearch.ts';
import { useCrudMutation } from '../hooks/useCrudMutation.ts';
import { Suspense } from 'react';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { Search } from '../../../../components/Search/Search.tsx';
import { SearchTable } from '../components/SearchTable/SearchTable.tsx';

export interface Data {
  business_models: [];
}

export function BusinessModel() {
  const loaderData = useLoaderData() as Data;
  const { data } = useQuery({ queryKey: [ 'business-models' ], queryFn: getAllBusinessModels });
  const { search, handleSearchChange } = useSearchByName(data ?? []);

  useCrudMutation({
    crudPath: 'business-models',
    crudQueryKey: 'business-models'
  });

  return (
    <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
      <Await resolve={ loaderData.business_models }>
        <div className="animate__animated animate__fadeIn flex flex-col gap-6">
          <Search handleSearchChange={ handleSearchChange } />
          <SearchTable searchItems={ search } />
        </div>
      </Await>
    </Suspense>
  );
}

export async function getAllBusinessModelsLoader() {
  return defer({
    countries: queryClient.fetchQuery({
      queryKey: [ 'business-models' ],
      queryFn: getAllBusinessModels
    })
  });
}