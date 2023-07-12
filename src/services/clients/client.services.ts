import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { ClientResponse } from '../../models/Client/client.model.ts';

export async function getAllClients() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  const { data } = await axiosInstance.get<ClientResponse>('clients', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.clients;
}