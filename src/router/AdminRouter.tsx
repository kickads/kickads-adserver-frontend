import { Admin, NotFound } from '../views';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    index: true,
    element: <Admin />,
    errorElement: <NotFound />
  }
]);

export function AdminRouter() {
  return <RouterProvider router={ router } />
}