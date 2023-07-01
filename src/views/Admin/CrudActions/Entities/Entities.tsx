import { Suspense, useEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { Search } from '../../../../components/Search/Search.tsx';
import { SearchTable } from '../components/SearchTable/SearchTable.tsx';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { useSearchByName } from '../../../../hooks/useSearch.ts';
import { getAllEntities } from '../../../../services/entities/entities.services.ts';
import { useStore } from '../../../../state/store/store.tsx';
import { successNotification } from '../../../../services/notification/notification.services.ts';
import { getCookie } from '../../../../helpers/Cookies/cookies.helper.ts';
import { axiosInstance } from '../../../../config/axios/axios.config.ts';

export interface Data {
  entities: [];
}

interface ItemModel {
  id: number;
  name: string;
}

export function Entities() {
  const loaderData = useLoaderData() as Data;
  const { data } = useQuery({ queryKey: [ 'entities' ], queryFn: getAllEntities });
  const { search, handleSearchChange } = useSearchByName(data ?? []);

  const setCrudPath = useStore(state => state.setCrudPath);
  const setCrudQueryKey = useStore(state => state.setCrudQueryKey);
  const setCrudMutationDelete = useStore(state => state.setCrudMutationDelete);
  const setCrudMutationUpdate = useStore(state => state.setCrudMutationUpdate);

  const mutationCrudDelete = useMutation({
    mutationFn: (id: number) => deleteItem('entities', id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'entities' ]
      });

      successNotification('Eliminado');
    }
  });

  const mutationCrudUpdate = useMutation({
    mutationFn: (item: ItemModel) => updateItem('entities', item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'entities' ]
      });

      successNotification('Actualizado');
    }
  });

  useEffect(() => {
    setCrudPath('countries');
    setCrudQueryKey('countries');
    setCrudMutationDelete(mutationCrudDelete);
    setCrudMutationUpdate(mutationCrudUpdate);
  }, []);

  return (
    <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
      <Await resolve={ loaderData.entities }>
        <div className="animate__animated animate__fadeIn flex flex-col gap-6">
          <Search handleSearchChange={ handleSearchChange } />
          <SearchTable searchItems={ search } />
        </div>
      </Await>
    </Suspense>
  );
}

export async function getAllEntitiesLoader() {
  return defer({
    countries: queryClient.fetchQuery({
      queryKey: [ 'entities' ],
      queryFn: getAllEntities
    })
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

async function updateItem(path: string, item: ItemModel) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.patch(`${ path }/${ item.id }`, { name: item.name }, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}