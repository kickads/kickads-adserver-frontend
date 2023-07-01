import { Await, defer, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSearchByName } from '../../../../hooks/useSearch.ts';
import { useCrudMutation } from '../hooks/useCrudMutation.ts';
import { Suspense } from 'react';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { Search } from '../../../../components/Search/Search.tsx';
import { SearchTable } from '../components/SearchTable/SearchTable.tsx';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { getAllCompanies } from '../../../../services/companies/company.services.ts';

export interface Data {
  companies: [];
}

export function Companies() {
  const loaderData = useLoaderData() as Data;
  const { data } = useQuery({ queryKey: [ 'companies' ], queryFn: getAllCompanies });
  const { search, handleSearchChange } = useSearchByName(data ?? []);

  useCrudMutation({
    crudPath: 'companies',
    crudQueryKey: 'companies'
  });

  return (
    <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
      <Await resolve={ loaderData.companies }>
        <div className="animate__animated animate__fadeIn flex flex-col gap-6">
          <Search handleSearchChange={ handleSearchChange } />
          <SearchTable searchItems={ search } />
        </div>
      </Await>
    </Suspense>
  );
}

export async function getAllCompaniesLoader() {
  return defer({
    countries: queryClient.fetchQuery({
      queryKey: [ 'companies' ],
      queryFn: getAllCompanies
    })
  });
}