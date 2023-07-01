import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { PriorityResponse } from '../../models/Priority/priority.model.ts';

export async function getAllPriorities() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<PriorityResponse>('priorities', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.priorities;
}