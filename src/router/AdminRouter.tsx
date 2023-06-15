import { Admin, AdminUsers, NotFound } from '../views';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LayoutAdmin } from '../layouts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Admin />
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
    ]
  },
]);

export function AdminRouter() {
  return <RouterProvider router={ router } />
}