import { Suspense } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useCurrencyQueryMutation } from '../hooks/useCurrencyQueryMutation.ts';
import { Loader } from '../../../../../components/Loader/Loader.tsx';
import { axiosInstance } from '../../../../../config/axios/axios.config.ts';
import { useStore } from '../../../../../state/store/store.tsx';
import { CurrencyResponse } from '../../../../../models/Currency/currency.model.ts';
import { CompanyModel } from '../../../../../models/Company/company.model.ts';

interface CurrencyInputs {
  price: number;
  name: string;
  country: string;
  country_id: number;
}

export function CreateCurrency() {
  const userToken = useStore(state => state.userToken);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CurrencyInputs>();
  const { mutationCurrencyCreate } = useCurrencyQueryMutation();
  const { data: countries } = useQuery({
    queryKey: [ 'currencies' ],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CurrencyResponse>('currencies', {
        headers: {
          'Authorization': `Bearer ${ userToken }`
        }
      });

      return data.data.currencies;
    }
  });

  const onSubmit = (currency: CurrencyInputs) => {
    mutationCurrencyCreate.mutate(currency);
    navigate(-1);
  }

  return (
    <>
      <button
        className="flex items-center justify-center gap-3 px-4 py-2 bg-gray-50 text-gray-500 font-inter text-sm rounded-lg hover:text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
        onClick={ () => navigate(-1) }
      >
        <ArrowUturnLeftIcon className="h-4" />
        Volver
      </button>
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
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-slate-700"
                placeholder="0"
                { ...register('price') }
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  defaultValue="USD"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm dark:text-white"
                  { ...register('name') }
                >
                  <option>USD</option>
                  <option>CAD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
            {/*<div>*/}
            {/*  <input*/}
            {/*    type="text"*/}
            {/*    id="price"*/}
            {/*    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"*/}
            {/*    { ...register('price', { value : currency.price }) }*/}
            {/*  />*/}
            {/*</div>*/}
          </div>

          {/*<div>*/}
          {/*  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Name</label>*/}
          {/*  <div>*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      id="name"*/}
          {/*      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"*/}
          {/*      { ...register('name', {  value : currency.name }) }*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}

          <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
            <Await resolve={ countries }>
              {
                (countries: CompanyModel[]) => (
                  <div>
                    <label htmlFor="country_id" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Country</label>
                    <div>
                      <select
                        id="country_id"
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
    </>
  );
}