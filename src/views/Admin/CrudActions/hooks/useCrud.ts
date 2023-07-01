import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { axiosInstance } from '../../../../config/axios/axios.config.ts';
import { getCookie } from '../../../../helpers/Cookies/cookies.helper.ts';
import { confirmNotification, successNotification } from '../../../../services/notification/notification.services.ts';

interface ItemModel {
  id: number;
  name: string;
}

interface CrudConfigModel {
  path: string,
  myQueryKey: string
}

interface ShowInputInUpdateModel {
  id: number | null,
  isShow: boolean
}

export function useCrud(crudConfig: CrudConfigModel) {
  const [ crudFieldCreate, setCrudFieldCreate ] = useState('');
  const [ crudFieldOnUpdate, setCrudFieldOnUpdate ] = useState('');
  const [ showInputInUpdate, setShowInputInUpdate ] = useState<ShowInputInUpdateModel>({
    id: null,
    isShow: false
  });
  const mutationDelete = useMutation({
    mutationFn: (id: number) => deleteItem(crudConfig.path, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ `${ crudConfig.myQueryKey }` ]
      });

      successNotification('Eliminado');
    }
  });
  const mutationUpdate = useMutation({
    mutationFn: (item: ItemModel) => updateItem(crudConfig.path, item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ `${ crudConfig.myQueryKey }` ]
      });

      successNotification('Actualizado');
    }
  });
  const mutationCreate = useMutation({
    mutationFn: (name: string) => createItem(crudConfig.path, name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ `${ crudConfig.myQueryKey }` ]
      });

      successNotification('Creado');
    }
  });

  const handleCreate = () => {
    mutationCreate.mutate(crudFieldCreate);
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    mutationUpdate.mutate({
      id: id,
      name: crudFieldOnUpdate
    });

    setCrudFieldOnUpdate('');
    setShowInputInUpdate(oldValue => ({ ...oldValue, isShow: false }));
  };

  const handleDelete = (item: ItemModel) => {
    confirmNotification({ title: item.name }).then(result => {
      (result.isConfirmed) && mutationDelete.mutate(item.id);
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrudFieldOnUpdate(e.target.value);
    setCrudFieldCreate(e.target.value);
  };

  return {
    handleDelete,
    setShowInputInUpdate,
    handleOnChange,
    handleUpdate,
    handleCreate,
    showInputInUpdate,
    crudFieldOnUpdate
  };
}

async function updateItem(path: string, item: ItemModel) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.patch(`${ path }/${ item.id }`, { name: item.name }, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

async function deleteItem(path: string, id: number) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.delete(`${ path }/${ id }`, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

async function createItem(path: string, name: string) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.post(`${ path }`, { name }, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    },
  });
}