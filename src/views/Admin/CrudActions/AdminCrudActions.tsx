import { Outlet } from 'react-router-dom';
import { Wrapper } from '../../../components/Utils/Wrapper.tsx';
import { SideBar } from './components/SideBar/SideBar.tsx';

export function AdminCrudActions() {
  return (
    <main className="min-h-screen py-6 bg-white dark:bg-gray-900">
      <Wrapper className="px-2">
        <section className="flex">
          <div className="w-2/12 pr-2 border-r dark:border-gray-700">
            <SideBar />
          </div>
          <div className="px-2 w-10/12 h-[calc(100vh-48px)] overflow-hidden">
            <Outlet />
          </div>
        </section>
      </Wrapper>
    </main>
  );
}