import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../state/store/store.tsx';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function SwitchSchemeColorMode() {
  const setColorMode = useStore(state => state.setColorMode);
  const [ enabled, setEnabled ] = useState(Boolean(localStorage.getItem('theme') === 'dark'));

  useEffect(() => {
    if (enabled) {
      setColorMode('dark');
    } else {
      setColorMode('light');
    }
  }, [ enabled ]);

  return (
    <Switch
      checked={ enabled }
      onChange={ setEnabled }
      className={classNames(
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-gray-400" />
        </span>
        <span
          className={classNames(
            enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3 text-indigo-600" />
        </span>
      </span>
    </Switch>
  );
}