import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { Search } from './components/Search.tsx';
import { CompanyTable } from './components/CompanyTable.tsx';
import { AlertInfo } from '../../../../components/Alerts/AlertInfo.tsx';
import { RedirectButton } from '../../../../components/Buttons/RedirectButton.tsx';
import { getAllCompanies } from '../../../../services/companies/company.services.ts';
import { useSearchCompany } from './hook/useSearchCompany.ts';
import { useCompanyQueryMutation } from './hook/useCompanyQueryMutation.ts';

export interface Data {
  companies: [];
}

export function Companies() {
  const loaderData = useLoaderData() as Data;
  const { data } = useCompanyQueryMutation();
  const { searchCompanies, handleSearchChange } = useSearchCompany(data ?? []);

  return (
    <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
      <Await resolve={ loaderData.companies }>
        <div className="relative animate__animated animate__fadeIn flex flex-col gap-6">
          <Search handleSearchChange={ handleSearchChange } />
          {
            searchCompanies.length
              ? <CompanyTable companies={ searchCompanies } />
              : <AlertInfo text="No se encontraron coincidencias." />
          }
        </div>
        <RedirectButton className="absolute bottom-3 right-3 flex items-center justify-center bg-gray-200 w-11 h-11 rounded-full" redirect="create">
          <PlusIcon className="h-5 stroke-gray-500 hover:stroke-gray-900 dark:stroke-gray-300 dark:hover:stroke-gray-400" />
        </RedirectButton>
      </Await>
    </Suspense>
  );
}

export async function getAllCompaniesLoader() {
  return defer({
    companies: queryClient.fetchQuery({
      queryKey: [ 'companies' ],
      queryFn: getAllCompanies
    })
  });
}