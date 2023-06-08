import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, NotFound } from '../views';

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