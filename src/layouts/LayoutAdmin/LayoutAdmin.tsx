import { Navbar, Wrapper } from '../../components';
import { Outlet } from 'react-router-dom';

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