import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { CountryResponse } from '../../models/Country/country.model.ts';

export async function getAllCountries() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<CountryResponse>('countries', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.countries;
}