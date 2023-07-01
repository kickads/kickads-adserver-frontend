import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { EntityResponse } from '../../models/Entity/entity.model.ts';

export async function getAllEntities() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<EntityResponse>('entities', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.entities;
}