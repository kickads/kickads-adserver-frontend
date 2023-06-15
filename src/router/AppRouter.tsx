import { PublicRouter } from './PublicRouter.tsx';
import { GuestRouter } from './GuestRouter.tsx';
import { useStore } from '../state/store';
import { AdminRouter } from './AdminRouter.tsx';
import { useEffect } from 'react';
import { getCookie } from '../helpers';

export function AppRouter() {
  const user = useStore(state => state.user);
  const setUserAuth = useStore(state => state.setUserAuth);
  const setColorMode = useStore(state => state.setColorMode);

  useEffect(() => {
    const colorMode = localStorage.getItem('theme') ?? 'light';
    const userCredentials = getCookie('userCredentials');
    const userToken = getCookie('userToken');

    setColorMode(colorMode);

    if (!userCredentials || !userToken) return;

    setUserAuth(JSON.parse(userCredentials), JSON.parse(userToken));
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