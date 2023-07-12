import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { CreativeResponse } from '../../models/Creatives/creative.model.ts';

export async function getAllCreatives() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<CreativeResponse>('creatives', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.creatives;
}