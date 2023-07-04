import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { CurrencyResponse } from '../../models/Currency/currency.model.ts';

export async function getAllCurrencies() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  const { data } = await axiosInstance.get<CurrencyResponse>('currencies', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.currencies;
}

export async function deleteCurrency(id: number) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.delete(`currencies/${ id }`, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

interface CreateCurrency {
  price: number;
  acronym: string;
  country_id: number;
}
export async function createCurrency(currency: CreateCurrency) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.post(`currencies`, currency, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

interface UpdateCurrency {
  id: number,
  price: number;
  acronym: string;
  country_id: number;
}
export async function updateCurrency(currency: UpdateCurrency) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.patch(`currencies/${ currency.id }`, currency, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

interface AcronymResponse {
  status: string,
  data: string[]
}
export async function getAllAcronyms() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<AcronymResponse>('currency-acronyms', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data;
}
