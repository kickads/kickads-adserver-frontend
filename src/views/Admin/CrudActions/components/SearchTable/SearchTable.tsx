import { SearchItem } from '../SearchItem/SearchItem.tsx';
import { useCrud } from '../../hooks/useCrud.ts';
export interface Props {
  searchItems: SearchItem[];
  path: string,
  myQueryKey: string
}

interface SearchItem {
  id: number;
  name: string;
}

export function SearchTable({ searchItems, path, myQueryKey }: Props) {
  const { handleDelete, setShowInputInUpdate, showInputInUpdate, handleOnChange, handleUpdate, crudFieldOnUpdate } = useCrud({
    path: path,
    myQueryKey: myQueryKey
  });

  return (
    <div className="h-[calc(100vh-108px)] overflow-auto">
      <table className="w-full max-w-md mx-auto">
        <thead className="sr-only">
        <tr className="font-inter text-gray-600">
          <th className="py-3 px-2 text-left">Nombre</th>
          <th className="py-3 px-2 text-left">Acciones</th>
        </tr>
        </thead>
        <tbody>
        { searchItems.map(searchItem =>
          <SearchItem
            item={ searchItem }
            key={ searchItem.id }
            handleDelete={ handleDelete }
            setShowInputInUpdate={ setShowInputInUpdate }
            showInputInUpdate={ showInputInUpdate }
            handleOnChange={ handleOnChange }
            handleUpdate={ handleUpdate }
            crudFieldOnUpdate={ crudFieldOnUpdate }
          />
        )}
        </tbody>
      </table>
    </div>
  );
}