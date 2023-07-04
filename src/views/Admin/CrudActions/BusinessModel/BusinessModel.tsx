import { Await, defer, useLoaderData } from 'react-router-dom';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { getAllBusinessModels } from '../../../../services/businessModel/businessModel.services.ts';
import { useQuery } from '@tanstack/react-query';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useSearchByName } from '../../../../hooks/useSearch.ts';
import { useCrudMutation } from '../hooks/useCrudMutation.ts';
import { Suspense } from 'react';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { Search } from '../../../../components/Search/Search.tsx';
import { SearchTable } from '../components/SearchTable/SearchTable.tsx';
import { AlertInfo } from '../../../../components/Alerts/AlertInfo.tsx';

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
          <span className="flex justify-center gap-1 text-xs font-inter">
            <InformationCircleIcon className="h-4 stroke-amber-500" />
            <p className="dark:text-gray-300">Solo valores a la A-Z y mínimo 1 carácter.</p>
          </span>
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

export async function getAllBusinessModelsLoader() {
  return defer({
    business_models: queryClient.fetchQuery({
      queryKey: [ 'business-models' ],
      queryFn: getAllBusinessModels
    })
  });
}