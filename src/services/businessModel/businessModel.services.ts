import { getCookie } from '../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { BusinessModelResponse } from '../../models/BusinessModel/businessModel.model.ts';

export async function getAllBusinessModels() {
  const userToken = JSON.parse(getCookie('userToken') ?? '');
  const { data } = await axiosInstance.get<BusinessModelResponse>('business-models', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.business_models;
}