import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../../../config/axios/axios.config.ts';
import { useStore } from '../../../../../state/store/store.tsx';
import { EntityResponse } from '../../../../../models/Entity/entity.model.ts';
import { CountryResponse } from '../../../../../models/Country/country.model.ts';
import { useCompanyQueryMutation } from '../hook/useCompanyQueryMutation.ts';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
    navigate(-1);
  }

  return (
    <>
      <button onClick={ () => navigate(-1) }>Volver</button>
      <form action="#" onSubmit={ handleSubmit(onSubmit) }>

        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            { ...register('name') }
          />
        </div>
        <div>
          <label htmlFor="entity_id">Entity</label>
          <select id="entity_id" { ...register('entity_id') }
          >
            <option value="">Seleccionar</option>
            {
              entities?.map(entity => <option value={ entity.id } key={ entity.id }>{ entity.name }</option>)
            }
          </select>
        </div>
        <div>
          <label htmlFor="country_id">Country</label>
          <select id="country_id" { ...register('country_id') }
          >
            <option value="">Seleccionar</option>
            {
              countries?.map(country => <option value={ country.id } key={ country.id }>{ country.name }</option>)
            }
          </select>
        </div>

        <button>Crear</button>
      </form>
    </>
  );
}