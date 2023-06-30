import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../../../config/axios/axios.config.ts';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { queryClient } from '../../../../../providers/ReactQueryProvider.tsx';
import { getCookie } from '../../../../../helpers/Cookies/cookies.helper.ts';
import { successNotification } from '../../../../../services/notification/notification.services.ts';

interface SearchItemProps {
  item: SearchItem;
}

interface SearchItem {
  id: number;
  name: string;
}

interface DeleteSearchItem {
  id: number;
}

export function SearchItem({ item }: SearchItemProps) {
  const [ status, setStatus ] = useState(false);
  const [ itemUpdated, setItemUpdated ] = useState('');
  const mutation = useMutation({
    mutationFn: ({ id, name }: SearchItem) => updateSearchedItem(id, name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'countries' ]
      });

      successNotification('Actualizado');
    }
  });
  const mutationDelete = useMutation({
    mutationFn: ({ id }: DeleteSearchItem) => deleteSearchedItem(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'countries' ]
      });

      successNotification('Eliminado');
    }
  });

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    mutation.mutate({
      id: id,
      name: itemUpdated
    });

    setStatus(!status);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemUpdated(e.target.value);
  };

  const handleDelete = (id: number) => {
    toast((t) => (
      <div className="w-32 py-1 flex flex-col items-center gap-1 dark:bg-slate-800">
        <div className="font-inter font-bold text-sm text-gray-600 whitespace-nowrap dark:text-slate-300">Confirmar
        </div>
        <div className="flex w-full">
          <button className="flex-1 flex items-center justify-center" onClick={ () => {
            toast.dismiss(t.id);
            mutationDelete.mutate({ id });
          } }>
            <CheckCircleIcon className="h-9 stroke-green-500"/>
          </button>
          <button className="flex-1 flex items-center justify-center" onClick={ () => toast.dismiss(t.id) }>
            <XCircleIcon className="h-9 stroke-red-500"/>
          </button>
        </div>
      </div>
    ), {
      className: 'p-0 m-0 dark:bg-slate-800 shadow',
      position: 'top-center',
      duration: 40000000000
    });
  };

  return (
    <tr key={ item.id }>
      <td className="py-3 text-sm font-medium">
        {
          status
            ? <form
              onSubmit={ (e) => handleUpdate(e, item.id) }
              className="animate__animated animate__fadeInUp animate__faster flex justify-between items-center gap-2"
            >
              <input
                type="text"
                placeholder={ item.name }
                className="block p-1 px-2 w-full sm:leading-6 rounded-md text-gray-900 bg-gray-50 border placeholder:text-gray-400 sm:text-sm dark:border-slate-700 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-300"
                onChange={ handleOnChange }
              />
              <div className="flex items-center gap-3">
                <button
                  disabled={ itemUpdated.length < 1 }
                  className={ `bg-kickads text-white px-2 py-1 rounded text-xs ${ itemUpdated.length < 1 && 'opacity-75 cursor-not-allowed' }` }
                >Guardar
                </button>
              </div>
            </form>
            : <div className="font-medium text-gray-900 dark:text-white px-2">{ item.name }</div>
        }
      </td>
      <td className="flex items-center justify-end gap-3 whitespace-nowrap py-4 text-sm text-gray-500">
        <button onClick={ () => setStatus(!status) }>
          <PencilSquareIcon className="h-5 hover:stroke-kickads dark:stroke-slate-400 dark:hover:stroke-kickads"/>
        </button>
        <button onClick={ () => handleDelete(item.id) }>
          <TrashIcon className="h-5 hover:stroke-red-400 dark:stroke-slate-400 dark:hover:stroke-red-400"/>
        </button>
      </td>
    </tr>
  );
}

async function updateSearchedItem(id: number, name: string) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.patch(`countries/${ id }`, { name }, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}

async function deleteSearchedItem(id: number) {
  const userToken = JSON.parse(getCookie('userToken') ?? '');

  await axiosInstance.delete(`countries/${ id }`, {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });
}