import { Suspense } from 'react';
import { Await, defer, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { queryClient } from '../../../../../providers/ReactQueryProvider.tsx';
import { Loader } from '../../../../../components/Loader/Loader.tsx';
import { getAllCountries } from '../../../../../services/countries/country.services.ts';
import { useCurrencyQueryMutation } from '../hooks/useCurrencyQueryMutation.ts';
import { CountryModel } from '../../../../../models/Country/country.model.ts';
import { CompanyModel } from '../../../../../models/Company/company.model.ts';

interface CurrencyInputs {
  id: number,
  price: number;
  name: string;
  country_id: number;
}

interface Data {
  countries: CountryModel[]
}

export function EditCurrency() {
  const { countries } = useLoaderData() as Data;
  const navigate = useNavigate();
  const { state: currency } = useLocation();
  const { register, handleSubmit } = useForm<CurrencyInputs>({
    defaultValues: {
      id: currency.id,
      country_id: currency.country_id,
    }
  });
  const { mutationCurrencyUpdate } = useCurrencyQueryMutation();

  const onSubmit = (currency: CurrencyInputs) => {
    mutationCurrencyUpdate.mutate(currency);
    navigate('/admin/crud-actions/currencies');
  };

  return (
    <>
      <button onClick={ () => navigate(-1) }>Volver</button>
      <form action="#" onSubmit={ handleSubmit(onSubmit) }>

        <div>
          <label htmlFor="Price">Price</label>
          <input
            type="text"
            id="price"
            { ...register('price', { value : currency.price }) }
          />
        </div>

        <div>
          <label htmlFor="Price">Name</label>
          <input
            type="text"
            id="name"
            { ...register('name', {  value : currency.name }) }
          />
        </div>

        <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
          <Await resolve={ countries }>
            {
              (countries: CompanyModel[]) => (
                <div>
                  <label htmlFor="country_id">Country</label>
                  <select id="country_id" defaultValue={ currency.country_id } { ...register('country_id') }
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

export async function getAllCountriesLoader() {
  return defer(
    {
      countries: queryClient.fetchQuery({
        queryKey: [ 'countries' ],
        queryFn: getAllCountries
      })
    });
}