import { PublicRouter } from './PublicRouter.tsx';
import { GuestRouter } from './GuestRouter.tsx';
import { useStore } from '../state/store';
import { AdminRouter } from './AdminRouter.tsx';
import { useEffect } from 'react';
import { getCookie } from '../helpers';

export function AppRouter() {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    const credentials = getCookie('credentials') ?? '{}';
    setUser(JSON.parse(credentials));
  }, []);

  if (user?.role === 'guest') {
    console.log('guest');
    return <GuestRouter />;
  } else if (user?.role === 'admin') {
    console.log('admin');
    return <AdminRouter />;
  }

  console.log('public');
  return <PublicRouter />;
}