import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { getAllCompanies } from '../../../../services/companies/company.services.ts';
import { useSearchCompany } from './hook/useSearchCompany.ts';
import { useCompanyQueryMutation } from './hook/useCompanyQueryMutation.ts';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { Search } from './components/Search.tsx';
import { CompanyTable } from './components/CompanyTable.tsx';
import { AlertInfo } from '../../../../components/Alerts/AlertInfo.tsx';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';

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
        <div className="animate__animated animate__fadeIn flex flex-col gap-6">
          <Search handleSearchChange={ handleSearchChange } />
          {
            searchCompanies.length
              ? <CompanyTable companies={ searchCompanies } />
              : <AlertInfo text="No se encontraron companias." />
          }
        </div>
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