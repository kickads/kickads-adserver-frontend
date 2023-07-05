import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar.tsx';
import { Wrapper } from '../../components/Utils/Wrapper.tsx';

export function LayoutAdmin() {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-gray-900">
        <Wrapper className="px-2">
          <Outlet />
        </Wrapper>
      </main>
    </>
  );
}