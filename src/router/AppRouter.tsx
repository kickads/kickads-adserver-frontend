import { PublicRouter } from './PublicRouter.tsx';
import { GuestRouter } from './GuestRouter.tsx';
import { useStore } from '../state/store';
import { AdminRouter } from './AdminRouter.tsx';

export function AppRouter() {
  const user = useStore(state => state.user);

  if (user.role === 'guest') {
    console.log('guest');
    return <GuestRouter />;
  } else if (user.role === 'admin') {
    console.log('admin');
    return <AdminRouter />;
  }

  console.log('public');
  return <PublicRouter />;
}