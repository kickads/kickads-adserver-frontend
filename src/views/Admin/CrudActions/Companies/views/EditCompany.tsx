import { Suspense } from 'react';
import { Await, defer, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowUturnLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { queryClient } from '../../../../../providers/ReactQueryProvider.tsx';
import { useCompanyQueryMutation } from '../hook/useCompanyQueryMutation.ts';
import { getAllEntities } from '../../../../../services/entities/entities.services.ts';
import { getAllCountries } from '../../../../../services/countries/country.services.ts';
import { Loader } from '../../../../../components/Loader/Loader.tsx';
import { EntityModel } from '../../../../../models/Entity/entity.model.ts';
import { CountryModel } from '../../../../../models/Country/country.model.ts';
import { CompanyModel } from '../../../../../models/Company/company.model.ts';

interface CompanyInputs {
  id: number,
  name: string;
  entity_id: number;
  country_id: number;
}

interface Data {
  entities: EntityModel[],
  countries: CountryModel[]
}

export function EditCompany() {
  const { entities, countries } = useLoaderData() as Data;
  const navigate = useNavigate();
  const { state: company } = useLocation();
  const { register, handleSubmit } = useForm<CompanyInputs>({
    defaultValues: {
      id: company.id,
      entity_id: company.entity_id,
      country_id: company.country_id,
    }
  });
  const { mutationCompanyUpdate } = useCompanyQueryMutation();

  const onSubmit = (company: CompanyInputs) => {
    mutationCompanyUpdate.mutate(company);
    navigate('/admin/crud-actions/companies');
  };

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
          <p className="dark:text-gray-300">Solo valores a la A-Z y mínimo 1 carácter.</p>
        </span>
      </div>
      <div>
        <form
          action="#"
          className="max-w-md mx-auto font-inter space-y-6"
          onSubmit={ handleSubmit(onSubmit) }
        >

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Nombre</label>
            <div className="mt-2">
              <input
                type="text"
                id="name"
                required
                pattern="[a-zA-Z ]{2,100}"
                placeholder={ company.name }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                { ...register('name', { value: company.name }) }
              />
            </div>
          </div>

          <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
            <Await resolve={ entities }>
              {
                (entities: EntityModel[]) => (
                  <div>
                    <label htmlFor="entity_id" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Entity</label>
                    <div className="mt-2">
                      <select
                        id="entity_id"
                        required
                        defaultValue={ company.entity_id }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                        { ...register('entity_id') }
                      >
                        {
                          entities.map(entity => (
                            <option
                              value={ entity.id }
                              key={ entity.id }
                            >{ entity.name }</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                )
              }
            </Await>
          </Suspense>
          <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
            <Await resolve={ countries }>
              {
                (countries: CompanyModel[]) => (
                  <div>
                    <label htmlFor="country_id" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Country</label>
                    <div className="mt-2">
                      <select
                        id="country_id"
                        required
                        defaultValue={ company.country_id }
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                        { ...register('country_id') }
                      >
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

export async function getAllEntitiesAndCompaniesLoader() {
  return defer(
    {
      entities: queryClient.fetchQuery({
        queryKey: [ 'entities' ],
        queryFn: getAllEntities
      }),
      countries: queryClient.fetchQuery({
        queryKey: [ 'countries' ],
        queryFn: getAllCountries
      })
    });
}