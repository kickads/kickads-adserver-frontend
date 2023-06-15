import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../state/store';
import { axiosInstance } from '../../config';
import toast from 'react-hot-toast';

interface Props {
  items: CurrentItem[];
  currentItem: CurrentItem,
  url: string,
  fieldToUpdate: string
}

interface CurrentItem {
  id: number,
  name: string,
  path?: string,
}

interface ConfigForUpdate {
  userId: number,
  userToken: string | null,
  fieldToUpdate: string,
  fieldUpdated: string,
  url: string
}

async function updateField(configForUpdate: ConfigForUpdate) {
  await axiosInstance.patch(configForUpdate.url, {
    [configForUpdate.fieldToUpdate]: configForUpdate.fieldUpdated
  }, {
    headers: {
      'Authorization': `Bearer ${ configForUpdate.userToken }`
    }
  });
}

export function List({ items, currentItem, url, fieldToUpdate }: Props) {
  const [ selected, setSelected ] = useState<CurrentItem>(currentItem);
  const userToken = useStore(state => state.userToken);

  const handleOnChange = async (e: CurrentItem) => {
    setSelected(e);

    const configForUpdate: ConfigForUpdate = {
      userId: currentItem.id,
      userToken: userToken,
      fieldToUpdate: fieldToUpdate,
      fieldUpdated: e.path ?? '',
      url: url
    }

    const updateFieldPromise = updateField(configForUpdate);

    await toast.promise(updateFieldPromise, {
      loading: 'Actualizando',
      success: 'Listo',
      error: 'Error al actualizar'
    });
  }

  return (
    <div className="relative w-fit">
      <Listbox value={ selected } onChange={ (e) => handleOnChange(e) }>
        <Listbox.Button className="w-full py-2 px-4 bg-white text-left rounded-lg shadow">
          <span className="pr-6 block truncate capitalize">{ selected.name }</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={ Fragment }
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-fit mt-1 bg-white rounded-lg shadow text-left z-10">
            { items.map(item => (
              <Listbox.Option
                key={ item.id }
                value={ item }
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 whitespace-nowrap ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-400'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${ selected ? 'font-medium' : 'font-normal' }`}>
                      { item.name }
                    </span>
                    { selected
                        ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>)
                        : null
                    }
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}