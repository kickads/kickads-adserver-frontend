import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from '../views';
import { NotFound } from '../components';

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
    errorElement: <NotFound />
  }
]);

export function PublicRouter() {
  return <RouterProvider router={ router } />
}