import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  // Cog6ToothIcon,
  // UserIcon,
  SquaresPlusIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useStore } from '../../state/store/store.tsx';
import { axiosInstance } from '../../config/axios/axios.config.ts';
import { SwitchSchemeColorMode } from '../Utils/SwitchSchemeColorMode.tsx';
import { Wrapper } from '../Utils/Wrapper.tsx';
import getImagePath from '../../helpers/GetImagePath/getImagePath.ts';
import { AvatarFallback } from '../AvatarFallback/AvatarFallback.tsx';

const userMenu = [
  // {
  //   name: 'Profile',
  //   path: 'profile',
  //   Icon: <UserIcon className="w-5" />
  // },
  {
    name: 'Users',
    path: 'users',
    Icon: <UsersIcon className="w-5" />
  },
  {
    name: 'Crud actions',
    path: 'crud-actions',
    Icon: <SquaresPlusIcon className="w-5" />
  },
  // {
  //   name: 'Settings',
  //   path: 'settings',
  //   Icon: <Cog6ToothIcon className="w-5" />
  // },
];

export function Navbar() {
  const user = useStore(state => state.user);
  const userToken = useStore(state => state.userToken);
  const removeUserAuth = useStore(state => state.removeUserAuth);

  const logout = async () => {
    await axiosInstance.post('auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${ userToken }`
      }
    });

    removeUserAuth();
  }

  return (
    <header className="relative bg-white dark:bg-gray-900">
      <Wrapper className="flex justify-between items-center p-2 wrapper:px-0">
        <div className="hidden lg:block">
          <img src={ getImagePath('logos/logo-kickads.svg') } alt="Logo Kickads" width="40" />
        </div>
        <div className="hidden lg:block">
          <ul className="flex gap-8 text-gray-900 font-bold font-inter">
            <li className="dark:text-white">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="dark:text-white">
              <NavLink to="creatives">Creatives</NavLink>
            </li>
            <li className="dark:text-white">Sección 2</li>
            <li className="dark:text-white">Sección 3</li>
            <li className="dark:text-white">Sección 4</li>
          </ul>
        </div>
        <div className="flex lg:hidden z-10">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="relative hover:bg-gray-100 p-1 rounded-lg dark:hover:bg-slate-800">
                  {
                    open
                      ? <XMarkIcon className="w-10 stroke-zinc-500 dark:stroke-white" />
                      : <Bars3Icon className="w-10 stroke-zinc-500 dark:stroke-white" />
                  }
                </Disclosure.Button>
                <div className={ `absolute top-full left-0 px-3 ${ open && 'pb-3'} w-full bg-white dark:bg-slate-900` }>
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
                          <li className="hover:bg-gray-100 p-3 rounded-lg dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">
                            <NavLink to="/">Home</NavLink>
                          </li>
                          <li className="hover:bg-gray-100 p-3 rounded-lg dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">Item 2</li>
                          <li className="hover:bg-gray-100 p-3 rounded-lg dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">Item 3</li>
                          <li className="hover:bg-gray-100 p-3 rounded-lg dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">Item 4</li>
                          <li className="hover:bg-gray-100 p-3 rounded-lg dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">Item 5</li>
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
              <Menu.Button className="rounded-full overflow-hidden w-10">
                {
                  user?.avatar
                    ? <AvatarFallback
                        src={ user.avatar }
                        alt={ user.name }
                        className="h-10"
                      />
                    : <img src={ getImagePath('icons/user.svg') } alt="Image" className="" />
                }
                {/*<img src={ user?.avatar ?? '' } alt={ user?.name } className="w-11 rounded-full" />*/}
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
                  className="absolute right-0 top-14 bg-white shadow flex flex-col gap-1 w-40 font-inter rounded-lg overflow-hidden dark:bg-slate-800 z-10"
                >
                  {
                    userMenu.map(menu => (
                      <Menu.Item key={ menu.name }>
                        {({ active }) => (
                          <Link
                            className={`flex items-center gap-1 px-3 py-2 dark:text-slate-300 ${ active && 'bg-gray-100 dark:bg-slate-700 dark:hover:text-white' }`}
                            to={ menu.path }
                          >
                            <span>
                              { menu.Icon }
                            </span>
                              { menu.name }
                          </Link>
                        )}
                      </Menu.Item>
                    ))
                  }
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`flex items-center gap-1 px-3 py-2 dark:text-slate-300 ${ active && 'bg-gray-100 dark:bg-slate-700 dark:hover:text-white' }`}
                        onClick={ () => logout() }
                      >
                        <span>
                          <ArrowLeftOnRectangleIcon className="w-5" />
                        </span>
                        Cerrar Sesión
                      </button>
                    )}
                  </Menu.Item>
                  <div className="text-center py-2">
                    <SwitchSchemeColorMode />
                  </div>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </div>
      </Wrapper>
    </header>
  );
}