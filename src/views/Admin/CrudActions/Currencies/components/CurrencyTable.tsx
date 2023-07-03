import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  confirmNotification,
} from '../../../../../services/notification/notification.services.ts';
import { useCurrencyQueryMutation } from '../hooks/useCurrencyQueryMutation.ts';
import { CurrencyCollection, CurrencyModel } from '../../../../../models/Currency/currency.model.ts';

const tableTitles: string[] = [ 'price', 'name', 'country', 'acciones' ]

export function CurrencyTable({ currencies }: CurrencyCollection) {
  const { mutationCurrencyDelete } = useCurrencyQueryMutation();

  const handleDeleteCurrency = (currency: CurrencyModel) => {
    confirmNotification({ title: currency.name }).then(result => {
      (result.isConfirmed) && mutationCurrencyDelete.mutate(currency.id);
    });
  };

  return (
    <div className="relative h-[calc(100vh-108px)] overflow-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead>
                <tr>
                {
                  tableTitles.map(title => (
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 capitalize dark:text-white"
                      key={ title }
                    >
                      { title }
                    </th>
                  ))
                }
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {
                currencies.map(currency => (
                  <tr key={ currency.id }>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 dark:text-white">
                      { currency.price }
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0 dark:text-gray-300">
                      { currency.name }
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0 dark:text-gray-300">
                      { currency.country }
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 space-x-2">
                      <Link className="inline-block" to="edit" state={ currency }>
                        <PencilSquareIcon className="h-5 stroke-gray-500 hover:stroke-gray-900 dark:stroke-slate-300 dark:hover:stroke-slate-400" />
                      </Link>
                      <button onClick={ () => handleDeleteCurrency(currency) }>
                        <TrashIcon className="h-5 stroke-gray-500 hover:stroke-gray-900 dark:stroke-gray-300 dark:hover:stroke-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}