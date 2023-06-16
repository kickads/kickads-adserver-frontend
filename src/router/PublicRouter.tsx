import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from '../views/Login/Login.tsx';
import { NotFound } from '../views/NotFound/NotFound.tsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export function PublicRouter() {
  return <RouterProvider router={ router } />
}