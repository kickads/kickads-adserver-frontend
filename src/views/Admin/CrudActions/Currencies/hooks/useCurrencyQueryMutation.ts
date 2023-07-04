import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../../../providers/ReactQueryProvider.tsx';
import { successNotification } from '../../../../../services/notification/notification.services.ts';
import {
  createCurrency,
  deleteCurrency, getAllCurrencies,
  updateCurrency
} from '../../../../../services/currencies/currency.services.ts';

interface CreateCurrency {
  price: number;
  acronym: string;
  country_id: number;
}

interface UpdateCurrency {
  id: number,
  price: number;
  acronym: string;
  country_id: number;
}

export function useCurrencyQueryMutation() {
  const { data } = useQuery({ queryKey: [ 'currencies' ], queryFn: getAllCurrencies });

  const mutationCurrencyDelete = useMutation({
    mutationFn: (id: number) => deleteCurrency(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'currencies' ]
      });

      successNotification('Eliminado');
    }
  });

  const mutationCurrencyUpdate = useMutation({
    mutationFn: (currency: UpdateCurrency) => updateCurrency(currency),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'currencies' ]
      });

      successNotification('Actualizado');
    }
  });

  const mutationCurrencyCreate = useMutation({
    mutationFn: (currency: CreateCurrency) => createCurrency(currency),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ 'currencies' ]
      });

      successNotification('Creado');
    }
  });

  return { data, mutationCurrencyDelete, mutationCurrencyCreate, mutationCurrencyUpdate }
}