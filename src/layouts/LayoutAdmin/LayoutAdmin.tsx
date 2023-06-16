import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar.tsx';
import { Wrapper } from '../../components/Utils/Wrapper.tsx';

export function LayoutAdmin() {
  return (
    <>
      <Navbar />
      <main>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>
    </>
  );
}