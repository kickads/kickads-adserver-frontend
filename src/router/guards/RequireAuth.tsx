import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../../state/store/store.tsx';

export function RequireAuth() {
  const user = useStore(state => state.user);

  if (!user) return <Navigate to='/' />

  return <Outlet />;
}