import { useEffect, useState } from 'react';
import { CompanyModel } from '../../../../../models/Company/company.model.ts';

export function useSearchCompany(initialState: CompanyModel[]) {
  const [ searchCompanies, setSearchCompanies ] = useState(initialState);

  useEffect(() => {
    setSearchCompanies(initialState);
  }, [ initialState ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCompanies(initialState.filter(item => item.name.toLowerCase().includes(e.target.value)));
  };

  return { searchCompanies, handleSearchChange };
}