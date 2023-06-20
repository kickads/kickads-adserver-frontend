import { Navigate } from 'react-router-dom';
import { useStore } from '../../state/store/store.tsx';

interface Props {
  children: JSX.Element;
}

export function RequireNotAuth({ children }: Props) {
  const user = useStore(state => state.user);

  if (user?.role === 'guest') {
    return <Navigate to="/guest" />;
  } else if (user?.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  return children;
}