import { SearchItem } from '../SearchItem/SearchItem.tsx';

export interface Props {
  searchItems: SearchItem[];
}

interface SearchItem {
  id: number;
  name: string;
}

export function SearchTable({ searchItems }: Props) {
  return (
    <div className="h-[calc(100vh-108px)] overflow-auto">
      <table className="w-full max-w-md mx-auto">
        <thead className="sr-only">
        <tr className="font-inter text-gray-600">
          <th className="py-3 px-2 text-left">Nombre</th>
          <th className="py-3 px-2 text-left">Acciones</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
        { searchItems.map(searchItem =>
          <SearchItem item={ searchItem } key={ searchItem.id } />
        )}
        </tbody>
      </table>
    </div>
  );
}