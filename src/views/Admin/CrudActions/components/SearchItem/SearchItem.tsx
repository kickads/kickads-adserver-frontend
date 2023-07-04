import {
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useStore } from '../../../../../state/store/store.tsx';

interface SearchItemProps {
  item: SearchItem;
}

interface SearchItem {
  id: number;
  name: string;
}

export function SearchItem({ item }: SearchItemProps) {
  const crudMutationDelete = useStore(state => state.crudMutationDelete);
  const handleDeleteZustand = useStore(state => state.handleCrudDelete);
  const showInputInUpdate = useStore(state => state.showInputInUpdate);
  const setShowInputInUpdate = useStore(state => state.setShowInputInUpdate);
  const handleCrudFieldOnChange = useStore(state => state.handleCrudFieldOnChange);
  const crudFieldOnUpdate = useStore(state => state.crudFieldOnUpdate);
  const handleCrudUpdate = useStore(state => state.handleCrudUpdate);

  return (
    <tr key={ item.id }>
      <td className="py-4 text-sm font-medium">
        {
          showInputInUpdate.isShow && showInputInUpdate.id === item.id
            ? <form
              onSubmit={ (e) => handleCrudUpdate(e, item.id) }
              className="animate__animated animate__fadeInUp animate__faster flex justify-between items-center gap-2"
            >
              <input
                type="text"
                placeholder={ item.name }
                className="block p-1 px-2 w-full sm:leading-6 rounded-md text-gray-900 bg-gray-50 border placeholder:text-gray-400 sm:text-sm dark:border-slate-700 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-300"
                onChange={ handleCrudFieldOnChange }
                required
                pattern="[a-zA-Z ]{2,50}"
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
      <td className="h-[4.25rem] flex items-center justify-end gap-3 whitespace-nowrap py-4 text-sm text-gray-500">
        <button onClick={ () => setShowInputInUpdate({ id: item.id, isShow: !showInputInUpdate.isShow }) }>
          <PencilSquareIcon className="h-5 stroke-gray-500 hover:stroke-gray-900 dark:stroke-gray-300 dark:hover:stroke-gray-400"/>
        </button>
        <button onClick={ () => handleDeleteZustand(item, crudMutationDelete) }>
          <TrashIcon className="h-5 stroke-gray-500 hover:stroke-gray-900 dark:stroke-gray-300 dark:hover:stroke-gray-400"/>
        </button>
      </td>
    </tr>
  );
}