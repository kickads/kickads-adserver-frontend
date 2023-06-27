import { useState } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { axiosInstance } from '../../../../../config/axios/axios.config.ts';

interface SearchItemProps {
  item: SearchItem;
}

interface SearchItem {
  id: number;
  name: string;
}

export function SearchItem({ item }: SearchItemProps) {
  const [ status, setStatus ] = useState(false);
  const [ itemUpdated, setItemUpdated ] = useState('');


  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    await axiosInstance.patch(`countries/${ id }`, { name: itemUpdated });
    setStatus(!status);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemUpdated(e.target.value);
  }

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
                    className="bg-kickads text-white px-2 py-1 rounded text-xs"
                  >Guardar</button>
                </div>
              </form>
            : <div className="font-medium text-gray-900 dark:text-white px-2">{ item.name }</div>
        }
      </td>
      <td className="flex items-center justify-end gap-3 whitespace-nowrap py-4 text-sm text-gray-500">
        <button onClick={ () => setStatus(!status) }>
          <PencilSquareIcon className="h-5 hover:stroke-kickads dark:stroke-slate-400 dark:hover:stroke-kickads" />
        </button>
        <button>
          <TrashIcon className="h-5 hover:stroke-red-400 dark:stroke-slate-400 dark:hover:stroke-red-400" />
        </button>
      </td>
    </tr>
  );
}