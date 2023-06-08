import { PublicRouter } from './PublicRouter.tsx';
import { GuestRouter } from './GuestRouter.tsx';

export function AppRouter() {
  const isAuth = false;

  if (!isAuth) {
    return <PublicRouter />
  }

  return <GuestRouter />
}