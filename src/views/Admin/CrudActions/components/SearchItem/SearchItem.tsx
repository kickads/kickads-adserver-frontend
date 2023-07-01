import {
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface ItemModel {
  id: number;
  name: string;
}

interface ShowInputInUpdateModel {
  id: number | null,
  isShow: boolean
}

interface SearchItemProps {
  item: SearchItem;
  handleDelete: (item: ItemModel) => void
  setShowInputInUpdate: ({ id, isShow }: ShowInputInUpdateModel) => void,
  showInputInUpdate: ShowInputInUpdateModel
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleUpdate: (e: React.FormEvent<HTMLFormElement>, id: number) => void
  crudFieldOnUpdate: string
}

interface SearchItem {
  id: number;
  name: string;
}

export function SearchItem({ item, handleDelete, setShowInputInUpdate, showInputInUpdate, handleOnChange, handleUpdate, crudFieldOnUpdate }: SearchItemProps) {

  return (
    <tr key={ item.id }>
      <td className="py-3 text-sm font-medium">
        {
          showInputInUpdate.isShow && showInputInUpdate.id === item.id
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
                  disabled={ crudFieldOnUpdate.length < 1 }
                  className={ `bg-kickads text-white px-2 py-1 rounded text-xs ${ crudFieldOnUpdate.length < 1 && 'opacity-75 cursor-not-allowed' }` }
                >Guardar
                </button>
              </div>
            </form>
            : <div className="font-medium text-gray-900 dark:text-white px-2">{ item.name }</div>
        }
      </td>
      <td className="flex items-center justify-end gap-3 whitespace-nowrap py-4 text-sm text-gray-500">
        <button onClick={ () => setShowInputInUpdate({ id: item.id, isShow: !showInputInUpdate.isShow }) }>
          <PencilSquareIcon className="h-5 hover:stroke-kickads dark:stroke-slate-400 dark:hover:stroke-kickads"/>
        </button>
        <button onClick={ () => handleDelete(item) }>
          <TrashIcon className="h-5 hover:stroke-red-400 dark:stroke-slate-400 dark:hover:stroke-red-400"/>
        </button>
      </td>
    </tr>
  );
}