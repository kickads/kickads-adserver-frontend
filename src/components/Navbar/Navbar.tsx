import { ArrowLeftOnRectangleIcon, Bars3Icon, Cog6ToothIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../state/store';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import LogoKickads from '../../assets/images/logos/logo-kickads.svg';
import { Wrapper } from '../Utils';

export function Navbar() {
  const user = useStore(state => state.user);

  return (
    <header className="relative">

      <Wrapper className="flex justify-between items-center p-2 wrapper:px-0">

        <div className="hidden lg:block">
          <img src={ LogoKickads } alt="Logo Kickads" width="40" />
        </div>

        <div className="hidden lg:block">
          <ul className="flex gap-8 text-gray-900 font-bold font-inter">
            <li>Sección 1</li>
            <li>Sección 2</li>
            <li>Sección 3</li>
            <li>Sección 4</li>
          </ul>
        </div>

        <div className="flex lg:hidden">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="relative hover:bg-gray-100 p-1 rounded-lg">
                  {
                    open
                      ? <XMarkIcon className="w-10 stroke-zinc-500" />
                      : <Bars3Icon className="w-10 stroke-zinc-500" />
                  }
                </Disclosure.Button>

                <div className="absolute top-full left-0 px-3 w-full bg-white">
                  <Transition
                    as={ Fragment }
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Disclosure.Panel>
                      <nav>
                        <ul className="flex flex-col font-inter">
                          <li className="hover:bg-gray-100 p-3 rounded-lg">Item 1</li>
                          <li className="hover:bg-gray-100 p-3 rounded-lg">Item 2</li>
                          <li className="hover:bg-gray-100 p-3 rounded-lg">Item 3</li>
                          <li className="hover:bg-gray-100 p-3 rounded-lg">Item 4</li>
                          <li className="hover:bg-gray-100 p-3 rounded-lg">Item 5</li>
                        </ul>
                      </nav>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              </>
            )}
          </Disclosure>
        </div>

        <div className="relative">
          <Menu>
            <div className="flex items-center">
              <Menu.Button>
                <img src={ user.avatar } alt={ user.name } className="w-12 rounded-full" />
              </Menu.Button>
            </div>

            <div>
              <Transition
                as={ Fragment }
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  as="div"
                  className="absolute right-0 top-16 bg-white shadow flex flex-col gap-1 w-40 font-inter rounded-lg overflow-hidden"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex items-center gap-1 px-3 py-2 ${active && 'bg-gray-100'}`}
                        href="/account-settings"
                      >
                        <span>
                          <UserIcon className="w-5" />
                        </span>
                        Perfil
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex items-center gap-1 px-3 py-2 ${active && 'bg-gray-100'}`}
                        href="/account-settings"
                      >
                        <span>
                          <Cog6ToothIcon className="w-5" />
                        </span>
                        Configuración
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex items-center gap-1 px-3 py-2 ${active && 'bg-gray-100'}`}
                        href="/account-settings"
                      >
                        <span>
                          <ArrowLeftOnRectangleIcon className="w-5" />
                        </span>
                        Cerrar Sesión
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </div>

      </Wrapper>

    </header>
  );
}