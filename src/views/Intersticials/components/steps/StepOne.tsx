import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { getAllClients } from '../../../../services/clients/client.services.ts';
import { getAllCountries } from '../../../../services/countries/country.services.ts';
import { getAllBusinessModels } from '../../../../services/businessModel/businessModel.services.ts';
import { getAllCreatives } from '../../../../services/creatives/creative.services.ts';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { ClientModel } from '../../../../models/Client/client.model.ts';
import { CreativeModel } from '../../../../models/Creatives/creative.model.ts';
import { BusinessModelModel } from '../../../../models/BusinessModel/businessModel.model.ts';
import { CountryModel } from '../../../../models/Country/country.model.ts';
import { Intersticial } from '../../models/intersticial.model.ts';

interface Data {
  business_models: [],
  clients: [],
  countries: [],
  creatives: [],
}

interface StepOneProps {
  handleInputSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  creative: Intersticial
}

export function StepOne({ handleInputSelectChange, creative }: StepOneProps) {
  const { clients, creatives, business_models, countries } = useLoaderData() as Data;

  return (
    <form action="#" className="flex flex-col gap-8 py-8">
      <div>
        <label
          htmlFor="client_id"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
        >Cliente</label>
        <div className="mt-2">
          <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
            <Await resolve={ clients }>
              {
                (clients: ClientModel[]) => (
                  <select
                    id="client_id"
                    name="client_id"
                    required
                    value={ creative.client_id ?? '' }
                    onChange={ (e) => handleInputSelectChange(e) }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 capitalize placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar</option>
                    { clients.map(client => <option value={ client.id } key={ client.id }>{ client.name }</option>)}
                  </select>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div>
        <label
          htmlFor="creative_id"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
        >Formato ITT</label>
        <div className="mt-2">
          <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
            <Await resolve={ creatives }>
              {
                (creatives: CreativeModel[]) => (
                  <select
                    id="creative_id"
                    name="creative_id"
                    required
                    value={ creative.creative_id ?? '' }
                    onChange={ (e) => handleInputSelectChange(e) }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 capitalize placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar</option>
                    { creatives.map(creative => <option value={ creative.id } key={ creative.id }>{ creative.name }</option>)}
                  </select>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div>
        <label
          htmlFor="business_model_id"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
        >Business Model</label>
        <div className="mt-2">
          <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
            <Await resolve={ business_models }>
              {
                (business_models: BusinessModelModel[]) => (
                  <select
                    id="business_model_id"
                    name="business_model_id"
                    required
                    value={ creative.business_model_id ?? '' }
                    onChange={ (e) => handleInputSelectChange(e) }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 capitalize placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar</option>
                    { business_models.map(business_model => <option value={ business_model.id } key={ business_model.id }>{ business_model.name }</option>)}
                  </select>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div>
        <label
          htmlFor="country_id"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
        >País</label>
        <div className="mt-2">
          <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
            <Await resolve={ countries }>
              {
                (countries: CountryModel[]) => (
                  <select
                    id="country_id"
                    name="country_id"
                    required
                    value={ creative.country_id ?? '' }
                    onChange={ (e) => handleInputSelectChange(e) }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 capitalize placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar</option>
                    { countries.map(creative => <option value={ creative.id } key={ creative.id }>{ creative.name }</option>)}
                  </select>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </form>
  );
}

export function creativesCreateLoader() {
  return defer({
    clients: queryClient.fetchQuery({
      queryKey: [ 'clients' ],
      queryFn: () => getAllClients()
    }),
    countries: queryClient.fetchQuery({
      queryKey: [ 'countries' ],
      queryFn: () => getAllCountries()
    }),
    business_models: queryClient.fetchQuery({
      queryKey: [ 'business_models' ],
      queryFn: () => getAllBusinessModels()
    }),
    creatives: queryClient.fetchQuery({
      queryKey: [ 'creatives' ],
      queryFn: () => getAllCreatives()
    }),
  })
}