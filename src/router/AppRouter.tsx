import { useEffect } from 'react';
import { useStore } from '../state/store/store.tsx';
import { GuestRouter } from './GuestRouter.tsx';
import { AdminRouter } from './AdminRouter.tsx';
import { PublicRouter } from './PublicRouter.tsx';

export function AppRouter() {
  const user = useStore(state => state.user);
  const setColorMode = useStore(state => state.setColorMode);

  useEffect(() => {
    const colorMode = localStorage.getItem('theme') ?? 'light';
    setColorMode(colorMode);
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