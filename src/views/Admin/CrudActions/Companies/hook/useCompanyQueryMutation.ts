import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../../../providers/ReactQueryProvider.tsx';
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  updateCompany
} from '../../../../../services/companies/company.services.ts';
import { successNotification } from '../../../../../services/notification/notification.services.ts';

interface CreateCompany {
  name: string;
  entity_id: number;
  country_id: number;
}

interface UpdateCompany {
  id: number,
  name: string;
  entity_id: number;
  country_id: number;
}

export function useCompanyQueryMutation() {
  const { data } = useQuery({ queryKey: [ 'companies' ], queryFn: getAllCompanies });

  const mutationCompanyDelete = useMutation({
    mutationFn: (id: number) => deleteCompany(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'companies' ]
      });

      successNotification('Eliminado');
    }
  });

  const mutationCompanyUpdate = useMutation({
    mutationFn: (company: UpdateCompany) => updateCompany(company),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'companies' ]
      });

      successNotification('Actualizado');
    }
  });

  const mutationCompanyCreate = useMutation({
    mutationFn: (company: CreateCompany) => createCompany(company),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'companies' ]
      });

      successNotification('Creado');
    }
  });

  return { data, mutationCompanyDelete, mutationCompanyCreate, mutationCompanyUpdate }
}