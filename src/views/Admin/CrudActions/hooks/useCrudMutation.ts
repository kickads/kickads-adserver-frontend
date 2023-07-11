import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { useStore } from '../../../../state/store/store.tsx';
import { errorNotification, successNotification } from '../../../../services/notification/notification.services.ts';
import { createItem, deleteItem, updateItem } from '../services/crudActions.services.ts';

interface ItemModel {
  id: number;
  name: string;
}

interface UseCrudMutationModel {
  crudPath: string,
  crudQueryKey: string
}

export interface ErrorResponse {
  response: ErrorData;
}

export interface ErrorData {
  status: string;
  data: ErrorModel;
}

export interface ErrorModel {
  message: string;
}

// error.response.data.message

export function useCrudMutation({ crudPath, crudQueryKey }: UseCrudMutationModel) {
  const userToken = useStore(state => state.userToken);
  const setCrudPath = useStore(state => state.setCrudPath);
  const setCrudQueryKey = useStore(state => state.setCrudQueryKey);
  const setCrudMutationDelete = useStore(state => state.setCrudMutationDelete);
  const setCrudMutationUpdate = useStore(state => state.setCrudMutationUpdate);
  const setCrudMutationCreate = useStore(state => state.setCrudMutationCreate);

  const mutationCrudDelete = useMutation({
    mutationFn: (id: number) => deleteItem({ userToken, id, path: crudPath }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ crudQueryKey ]
      });

      successNotification('Eliminado');
    }
  });

  const mutationCrudUpdate = useMutation({
    mutationFn: (item: ItemModel) => updateItem({ userToken, item, path: crudPath }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ crudQueryKey ]
      });

      successNotification('Actualizado');
    },
    onError: (error: ErrorResponse) => {
      errorNotification(error.response.data.message)
    }
  });

  const mutationCrudCreate = useMutation({
    mutationFn: (name: string) => createItem({ userToken, name, path: crudPath }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ crudQueryKey ]
      });

      successNotification('Creado');
    },
    onError: (error: ErrorResponse) => {
      errorNotification(error.response.data.message)
    }
  });

  useEffect(() => {
    setCrudPath(crudPath);
    setCrudQueryKey(crudQueryKey);
    setCrudMutationDelete(mutationCrudDelete);
    setCrudMutationUpdate(mutationCrudUpdate);
    setCrudMutationCreate(mutationCrudCreate);
  }, []);
}