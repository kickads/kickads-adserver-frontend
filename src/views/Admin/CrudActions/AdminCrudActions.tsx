import { NavLink, Outlet } from 'react-router-dom';
import {
  BriefcaseIcon,
  BuildingOffice2Icon, CubeIcon,
  CurrencyDollarIcon,
  FingerPrintIcon, Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

const crudItems = [
  {
    name: 'Countries',
    path: '/admin/crud-actions',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Entities',
    path: 'entities',
    icon: CubeIcon
  },
  {
    name: 'Business Model',
    path: 'business-model',
    icon: BriefcaseIcon
  },
  {
    name: 'Priorities',
    path: 'priorities',
    icon: Square3Stack3DIcon
  },
  {
    name: 'Companies',
    path: 'companies',
    icon: BuildingOffice2Icon
  },
  {
    name: 'Currencies',
    path: 'currencies',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Roles',
    path: 'roles',
    icon: FingerPrintIcon
  },
];

export function AdminCrudActions() {
  return (
    <section className="flex min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-56px)] py-6">

      <div className="w-2/12 pr-2 border-r dark:border-slate-700">
        <ul className="flex flex-col gap-1">
          {
            crudItems.map(item => (
              <li className="rounded-lg overflow-hidden" key={ item.path }>
                <NavLink
                  to={ item.path }
                  className={ ({ isActive }) => `py-2 px-3 flex gap-2 group hover:text-kickads hover:bg-gray-50 dark:hover:bg-slate-800 ${ isActive && 'bg-gray-50 dark:bg-slate-800'}`}
                  end
                >
                  <item.icon className="h-6 stroke-gray-400 group-hover:stroke-kickads dark:stroke-slate-500" />
                  <span className="text-sm text-gray-700 font-inter font-[600] leading-6 group-hover:text-kickads dark:text-slate-300">{ item.name }</span>
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="px-2 w-10/12">
        <Outlet />
      </div>


    </section>
  );
}