import { PublicRouter } from './PublicRouter.tsx';
import { GuestRouter } from './GuestRouter.tsx';

export function AppRouter() {
  const isAuth = true;

  if (!isAuth) {
    return <PublicRouter />
  }

  return <GuestRouter />
}