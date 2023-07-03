import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../../../config/axios/axios.config.ts';
import { useStore } from '../../../../../state/store/store.tsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCurrencyQueryMutation } from '../hooks/useCurrencyQueryMutation.ts';
import { CurrencyResponse } from '../../../../../models/Currency/currency.model.ts';

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
      <button onClick={ () => navigate(-1) }>Volver</button>
      <form action="#" onSubmit={ handleSubmit(onSubmit) }>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            { ...register('price') }
          />
        </div>
        <div>
          <label htmlFor="price">Name</label>
          <input
            type="text"
            id="name"
            { ...register('name') }
          />
        </div>
        <div>
          <label htmlFor="country_id">Country</label>
          <select id="country_id" { ...register('country_id') }
          >
            <option value="">Seleccionar</option>
            {
              countries?.map(country => <option value={ country.country_id } key={ country.id }>{ country.country }</option>)
            }
          </select>
        </div>

        <button>Crear</button>
      </form>
    </>
  );
}