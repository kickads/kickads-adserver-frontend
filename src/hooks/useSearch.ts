import { useEffect, useState } from 'react';

export interface Search {
  id: number;
  name: string;
}

export function useSearchByName(initialState: Search[]) {
  const [ search, setSearch ] = useState(initialState);

  useEffect(() => {
    setSearch(initialState);
  }, [ initialState ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(initialState.filter(item => item.name.toLowerCase().includes(e.target.value)));
  };

  return { search, handleSearchChange };
}