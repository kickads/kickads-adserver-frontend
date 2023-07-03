import { Suspense } from 'react';
import { Await, defer, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
    <>
      <button onClick={ () => navigate(-1) }>Volver</button>
      <form action="#" onSubmit={ handleSubmit(onSubmit) }>

        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={ company.name }
            { ...register('name') }
          />
        </div>

        <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
          <Await resolve={ entities }>
            {
              (entities: EntityModel[]) => (
                <div>
                  <label htmlFor="entity_id">Entity</label>
                  <select id="entity_id" defaultValue={ company.entity_id } { ...register('entity_id') }
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
              )
            }
          </Await>
        </Suspense>
        <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
          <Await resolve={ countries }>
            {
              (countries: CompanyModel[]) => (
                <div>
                  <label htmlFor="country_id">Country</label>
                  <select id="country_id" defaultValue={ company.country_id } { ...register('country_id') }
                  >
                    {
                      countries?.map(country => <option value={ country.id } key={ country.id }>{ country.name }</option>)
                    }
                  </select>
                </div>
              )
            }
          </Await>
        </Suspense>
        <button>Guardar</button>
      </form>
    </>
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