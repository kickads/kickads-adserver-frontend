import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Props {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Search({ handleSearchChange }: Props) {
  return (
    <div className="max-w-md w-full mx-auto">
      <label htmlFor="search" className="sr-only">
        Buscar
      </label>
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:stroke-slate-300" aria-hidden="true"/>
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-300 dark:ring-slate-700"
            placeholder="Buscar..."
            autoComplete="off"
            onChange={ handleSearchChange }
          />
        </div>
      </div>
    </div>
  );
}