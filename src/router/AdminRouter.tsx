import { Admin, AdminUsers, NotFound } from '../views';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    index: true,
    element: <Admin />,
    errorElement: <NotFound />
  },
  {
    path: 'admin',
    children: [
      {
        path: 'users',
        element: <AdminUsers />
      }
    ]
  }
]);

export function AdminRouter() {
  return <RouterProvider router={ router } />
}