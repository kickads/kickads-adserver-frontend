import { useStore } from '../../state/store/store.tsx';
import { Navigate, Outlet } from 'react-router-dom';

export function RequireGuest() {
  const user = useStore(state => state.user);

  if (user?.role === 'guest') return <Outlet />;

  return <Navigate to='/' />
}