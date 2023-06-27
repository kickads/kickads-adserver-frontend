import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { getAllCountries } from '../../../../services/countries/country.services.ts';
import { Search } from '../../../../components/Search/Search.tsx';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { useSearchByName } from '../../../../hooks/useSearch.ts';
import { SearchTable } from '../components/SearchTable/SearchTable.tsx';

export interface Data {
  countries: [];
}

export function Countries() {
  const loaderData = useLoaderData() as Data;
  const { data } = useQuery({ queryKey: [ 'countries' ], queryFn: getAllCountries });
  const { search, handleSearchChange } = useSearchByName(data ?? []);

  return (
    <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
      <Await resolve={ loaderData.countries }>
        <div className="animate__animated animate__fadeIn">
          <Search handleSearchChange={ handleSearchChange } />
          <SearchTable searchItems={ search } />
        </div>
      </Await>
    </Suspense>
  );
}

export async function getAllCountriesLoader() {
  return defer({
    countries: queryClient.fetchQuery({
      queryKey: [ 'countries' ],
      queryFn: getAllCountries
    })
  });
}

