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

interface CreateCompany {
  name: string;
  entity_id: number;
  country_id: number;
}
export async function createCompany(company: CreateCompany) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.post(`companies`, company, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

interface UpdateCompany {
  id: number,
  name: string;
  entity_id: number;
  country_id: number;
}
export async function updateCompany(company: UpdateCompany) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.patch(`companies/${ company.id }`, company, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}
