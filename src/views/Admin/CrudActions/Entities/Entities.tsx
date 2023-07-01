import { Suspense, useEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../../providers/ReactQueryProvider.tsx';
import { useStore } from '../../../../state/store/store.tsx';
import { Search } from '../../../../components/Search/Search.tsx';
import { SearchTable } from '../components/SearchTable/SearchTable.tsx';
import { Loader } from '../../../../components/Loader/Loader.tsx';
import { useSearchByName } from '../../../../hooks/useSearch.ts';
import { getAllEntities } from '../../../../services/entities/entities.services.ts';
import { successNotification } from '../../../../services/notification/notification.services.ts';
import { createItem, deleteItem, updateItem } from '../services/crudActions.services.ts';

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

  const userToken = useStore(state => state.userToken);
  const setCrudPath = useStore(state => state.setCrudPath);
  const setCrudQueryKey = useStore(state => state.setCrudQueryKey);
  const setCrudMutationDelete = useStore(state => state.setCrudMutationDelete);
  const setCrudMutationUpdate = useStore(state => state.setCrudMutationUpdate);
  const setCrudMutationCreate = useStore(state => state.setCrudMutationCreate);

  const mutationCrudDelete = useMutation({
    mutationFn: (id: number) => deleteItem({ userToken, id, path: 'entities' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'entities' ]
      });

      successNotification('Eliminado');
    }
  });

  const mutationCrudUpdate = useMutation({
    mutationFn: (item: ItemModel) => updateItem({ userToken, item, path: 'entities' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'entities' ]
      });

      successNotification('Actualizado');
    }
  });

  const mutationCrudCreate = useMutation({
    mutationFn: (name: string) => createItem({ userToken, name, path: 'entities' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'entities' ]
      });

      successNotification('Creado');
    }
  });


  useEffect(() => {
    setCrudPath('countries');
    setCrudQueryKey('countries');
    setCrudMutationDelete(mutationCrudDelete);
    setCrudMutationUpdate(mutationCrudUpdate);
    setCrudMutationCreate(mutationCrudCreate);
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