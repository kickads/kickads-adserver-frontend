import { axiosInstance } from '../../../../config/axios/axios.config.ts';

interface ItemModel {
  id: number;
  name: string;
}

interface DeleteItemModel {
  id: number;
  path: string;
  userToken: string | null
}
export async function deleteItem({ userToken, id, path }: DeleteItemModel) {
  await axiosInstance.delete(`${ path }/${ id }`, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

interface UpdateItemModel {
  item: ItemModel;
  path: string;
  userToken: string | null
}
export async function updateItem({ userToken, item, path }: UpdateItemModel) {
  await axiosInstance.patch(`${ path }/${ item.id }`, { name: item.name }, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

interface CreateItemModel {
  name: string;
  path: string;
  userToken: string | null
}
export async function createItem({ userToken, name, path}: CreateItemModel) {
  await axiosInstance.post(`${ path }`, { name }, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    },
  });
}