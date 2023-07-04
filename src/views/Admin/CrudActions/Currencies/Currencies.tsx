import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { Search } from './components/Search.tsx';
import { AlertInfo } from '../../../../components/Alerts/AlertInfo.tsx';
import { RedirectButton } from '../../../../components/Buttons/RedirectButton.tsx';
import { getAllCurrencies } from '../../../../services/currencies/currency.services.ts';
import { useCurrencyQueryMutation } from './hooks/useCurrencyQueryMutation.ts';
import { useSearchCurrency } from './hooks/useSearchCurrency.ts';
import { CurrencyTable } from './components/CurrencyTable.tsx';

export interface Data {
  currencies: [];
}

export function Currencies() {
  const loaderData = useLoaderData() as Data;
  const { data } = useCurrencyQueryMutation();
  const { searchCurrencies, handleSearchChange } = useSearchCurrency(data ?? []);

  return (
    <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
      <Await resolve={ loaderData.currencies }>
        <div className="relative animate__animated animate__fadeIn flex flex-col gap-6">
          <Search handleSearchChange={ handleSearchChange } />
          {
            searchCurrencies.length
              ? <CurrencyTable currencies={ searchCurrencies } />
              : <AlertInfo text="No se encontraron currencies" />
          }
        </div>
        <RedirectButton
          className="absolute bottom-3 right-3 flex items-center justify-center bg-gray-200 w-11 h-11 rounded-full dark:bg-gray-700"
          redirect="create"
        >
          <PlusIcon className="h-5 stroke-gray-500 hover:stroke-gray-900 dark:stroke-gray-300 dark:hover:stroke-white" />
        </RedirectButton>
      </Await>
    </Suspense>
  );
}

export async function getAllCurrenciesLoader() {
  return defer({
    currencies: queryClient.fetchQuery({
      queryKey: [ 'currencies' ],
      queryFn: getAllCurrencies
    })
  });
}