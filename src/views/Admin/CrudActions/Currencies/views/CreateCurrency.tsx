import { Suspense } from 'react';
import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowUturnLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { queryClient } from '../../../../../providers/ReactQueryProvider.tsx';
import { Loader } from '../../../../../components/Loader/Loader.tsx';
import { useCurrencyQueryMutation } from '../hooks/useCurrencyQueryMutation.ts';
import { getAllAcronyms } from '../../../../../services/currencies/currency.services.ts';
import { getAllCountries } from '../../../../../services/countries/country.services.ts';
import { CompanyModel } from '../../../../../models/Company/company.model.ts';
import { CountryModel } from '../../../../../models/Country/country.model.ts';

interface CurrencyInputs {
  price: number;
  acronym: string;
  country: string;
  country_id: number;
}

interface Data {
  countries: CountryModel[]
  acronyms: string[]
}

export function CreateCurrency() {
  const navigate = useNavigate();
  const { countries, acronyms } = useLoaderData() as Data;
  const { register, handleSubmit } = useForm<CurrencyInputs>();
  const { mutationCurrencyCreate } = useCurrencyQueryMutation();

  const onSubmit = (currency: CurrencyInputs) => {
    mutationCurrencyCreate.mutate(currency);
    navigate('/admin/crud-actions/currencies');
  }

  return (
    <div className="space-y-6">
      <button
        className="flex items-center justify-center gap-3 px-4 py-2 bg-gray-50 text-gray-500 font-inter text-sm rounded-lg hover:text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
        onClick={ () => navigate(-1) }
      >
        <ArrowUturnLeftIcon className="h-4" />
        Volver
      </button>
      <div>
        <span className="flex justify-center gap-1 text-xs font-inter">
          <InformationCircleIcon className="h-4 stroke-amber-500" />
          <p className="dark:text-gray-300">Solo valores numéricos.</p>
        </span>
      </div>
      <div>
        <form
          action="#"
          className="max-w-md mx-auto font-inter space-y-6"
          onSubmit={ handleSubmit(onSubmit) }
        >
          <div>
            <label htmlFor="Price" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Price</label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm dark:text-gray-300">$</span>
              </div>
              <input
                type="text"
                id="price"
                pattern='[0-9.]+[^.]'
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-slate-700"
                placeholder="0"
                required
                { ...register('price') }
              />
              <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
                <Await resolve={ acronyms }>
                  {
                    (acronyms) => (
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="acronym" className="sr-only">
                          Acronym
                        </label>
                        <select
                          id="acronym"
                          required
                          className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm dark:text-white"
                          { ...register('acronym') }
                        >
                          <option value="">Seleccionar</option>
                          {
                            acronyms.map((acronym: string) => <option value={ acronym }>{ acronym }</option>)
                          }
                        </select>
                      </div>
                    )
                  }
                </Await>
              </Suspense>
            </div>
          </div>
          <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
            <Await resolve={ countries }>
              {
                (countries: CompanyModel[]) => (
                  <div>
                    <label htmlFor="country_id" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Country</label>
                    <div>
                      <select
                        id="country_id"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                        { ...register('country_id') }
                      >
                        <option value="">Seleccionar</option>
                        {
                          countries?.map(country => <option value={ country.id } key={ country.id }>{ country.name }</option>)
                        }
                      </select>
                    </div>
                  </div>
                )
              }
            </Await>
          </Suspense>
          <div>
            <button className="flex w-full justify-center rounded-md bg-kickads px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kickads dark:bg-kickads">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getAllCountriesAndAcronymsLoader() {
  return defer({
    acronyms: queryClient.fetchQuery({
      queryKey: [ 'acronyms' ],
      queryFn: getAllAcronyms
    }),
    countries: queryClient.fetchQuery({
      queryKey: [ 'countries' ],
      queryFn: getAllCountries
    })
  });
}