import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { CompanyResponse } from '../../models/Company/company.model.ts';

export async function getAllCompanies() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  const { data } = await axiosInstance.get<CompanyResponse>('companies', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.companies;
}

export async function deleteCompany(id: number) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.delete(`companies/${ id }`, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}