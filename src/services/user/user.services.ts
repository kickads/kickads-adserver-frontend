import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { UsersResponse } from '../../views/Admin/Users/AdminUsers.tsx';

export async function getAllUsers() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<UsersResponse>('users', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.users;
}