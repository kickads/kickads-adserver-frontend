import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { RoleResponse } from '../../models/Role/role.model.ts';

export async function getAllRoles() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<RoleResponse>('roles', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.roles;
}