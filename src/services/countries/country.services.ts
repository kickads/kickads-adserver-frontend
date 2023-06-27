import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';

export interface CountryResponse {
  status: string;
  data: Country[];
}

export interface Country {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export async function getAllCountries() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<CountryResponse>('countries', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data;
}