import { SearchItem } from '../SearchItem/SearchItem.tsx';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export interface Props {
  searchItems: SearchItem[];
}

interface SearchItem {
  id: number;
  name: string;
}

export function SearchTable({ searchItems }: Props) {
  return (
    <>
      <span className="flex justify-center gap-1 text-xs font-inter">
        <InformationCircleIcon className="h-4 stroke-amber-500" />
        <p className="dark:text-gray-300">Solo valores a la A-Z y mínimo 1 carácter.</p>
      </span>
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
    </>
  );
}