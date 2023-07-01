import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../state/store/store.tsx';

interface Props {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Search({ handleSearchChange }: Props) {
  const handleCrudCreate = useStore(state => state.handleCrudCreate);
  const [ searchItem, setSearchItem ] = useState('');

  return (
    <div className="max-w-md w-full mx-auto">
      <label htmlFor="text" className="sr-only">
        Buscar o crear
      </label>
      <div className="flex shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:stroke-slate-300" aria-hidden="true"/>
          </div>
          <input
            type="text"
            name="text"
            id="text"
            className="block w-full rounded-l-md border-0 py-1.5 pl-10 text-gray-900 focus:outline-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:text-white dark:bg-slate-800 dark:placeholder:text-slate-300 dark:ring-0"
            placeholder="Buscar o crear"
            autoComplete="off"
            value={ searchItem }
            onChange={ (e) => {
              handleSearchChange(e);
              setSearchItem(e.target.value);
            }}
          />
        </div>
        <button
          className={ `bg-black w-10 flex items-center justify-center ${ searchItem.length < 1 && 'opacity-75 cursor-not-allowed' } rounded-r-md dark:bg-slate-700` }
          disabled={ searchItem.length < 1 }
          onClick={ () => {
            handleCrudCreate(searchItem);
            setSearchItem('');
          }}
        >
          <PlusIcon className="h-4 stroke-white dark:stroke-slate-300" />
        </button>
      </div>
    </div>
  );
}