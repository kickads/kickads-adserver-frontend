import { useStore } from '../../state/store/store.tsx';
import { Navigate, Outlet } from 'react-router-dom';

export function RequireAdmin() {
  const user = useStore(state => state.user);

  if (user?.role === 'admin') return <Outlet />;

  return <Navigate to='/' />
}