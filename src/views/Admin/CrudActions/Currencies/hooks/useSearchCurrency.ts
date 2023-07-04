import { useEffect, useState } from 'react';
import { CurrencyModel } from '../../../../../models/Currency/currency.model.ts';

export function useSearchCurrency(initialState: CurrencyModel[]) {
  const [ searchCurrencies, setSearchCurrencies ] = useState(initialState);

  useEffect(() => {
    setSearchCurrencies(initialState);
  }, [ initialState ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCurrencies(initialState.filter(item => item.acronym.toLowerCase().includes(e.target.value)));
  };

  return { searchCurrencies, handleSearchChange };
}