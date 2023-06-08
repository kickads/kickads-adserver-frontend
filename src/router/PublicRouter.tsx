import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from '../views';

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />
  }
]);

export function PublicRouter() {
  return <RouterProvider router={ router } />
}