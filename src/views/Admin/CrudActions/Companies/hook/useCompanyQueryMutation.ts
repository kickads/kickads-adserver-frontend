import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCompany, getAllCompanies } from '../../../../../services/companies/company.services.ts';
import { successNotification } from '../../../../../services/notification/notification.services.ts';
import { queryClient } from '../../../../../providers/ReactQueryProvider.tsx';

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

  // const mutationCrudUpdate = useMutation({
  //   mutationFn: (item: ItemModel) => updateItem({ userToken, item, path: crudPath }),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: [ crudQueryKey ]
  //     });
  //
  //     successNotification('Actualizado');
  //   }
  // });

  // const mutationCrudCreate = useMutation({
  //   mutationFn: (name: string) => createItem({ userToken, name, path: crudPath }),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: [ crudQueryKey ]
  //     });
  //
  //     successNotification('Creado');
  //   }
  // });

  return { data, mutationCompanyDelete }
}