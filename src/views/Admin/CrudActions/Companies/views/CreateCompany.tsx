import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowUturnLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { axiosInstance } from '../../../../../config/axios/axios.config.ts';
import { useStore } from '../../../../../state/store/store.tsx';
import { useCompanyQueryMutation } from '../hook/useCompanyQueryMutation.ts';
import { EntityResponse } from '../../../../../models/Entity/entity.model.ts';
import { CountryResponse } from '../../../../../models/Country/country.model.ts';

interface CompanyInputs {
  name: string;
  entity_id: number;
  country_id: number;
}

export function CreateCompany() {
  const userToken = useStore(state => state.userToken);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CompanyInputs>();
  const { mutationCompanyCreate } = useCompanyQueryMutation();
  const { data: entities } = useQuery({
    queryKey: [ 'entities' ],
    queryFn: async () => {
      const { data } = await axiosInstance.get<EntityResponse>('entities', {
        headers: {
          'Authorization': `Bearer ${ userToken }`
        }
      });

      return data.data.entities;
    }
  });
  const { data: countries } = useQuery({
    queryKey: [ 'countries' ],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CountryResponse>('countries', {
        headers: {
          'Authorization': `Bearer ${ userToken }`
        }
      });

      return data.data.countries;
    }
  });

  const onSubmit = (company: CompanyInputs) => {
    mutationCompanyCreate.mutate(company);
    navigate('/admin/crud-actions/companies');
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
          <p className="dark:text-gray-300">Solo valores a la A-Z y mínimo 1 carácter.</p>
        </span>
      </div>
      <div>
        <form
          action="#"
          onSubmit={ handleSubmit(onSubmit) }
          className="max-w-md mx-auto font-inter space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Nombre</label>
            <div className="mt-2">
              <input
                type="text"
                id="name"
                placeholder="Escribe un nombre"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                required
                { ...register('name') }
              />
            </div>
          </div>
          <div>
            <label htmlFor="entity_id" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Entity</label>
            <div className="mt-2">
              <select
                id="entity_id"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                { ...register('entity_id') }
              >
                <option value="">Seleccionar</option>
                {
                  entities?.map(entity => <option value={ entity.id } key={ entity.id }>{ entity.name }</option>)
                }
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="country_id" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Country</label>
            <div className="mt-2">
              <select
                id="country_id"
                required
                { ...register('country_id') }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focoutline-kickads sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
              >
                <option value="">Seleccionar</option>
                {
                  countries?.map(country => <option value={ country.id } key={ country.id }>{ country.name }</option>)
                }
              </select>
            </div>
          </div>
          <div>
            <button className="flex w-full justify-center rounded-md bg-kickads px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kickads dark:bg-kickads">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
}