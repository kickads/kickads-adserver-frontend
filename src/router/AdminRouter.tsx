import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Admin } from '../views/Admin/Admin.tsx';
import { AdminUsers } from '../views/Admin/Users/AdminUsers.tsx';
import { LayoutAdmin } from '../layouts/LayoutAdmin/LayoutAdmin.tsx';
import { NotFound } from '../views/NotFound/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutAdmin />,
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
  {
    path: '*',
    element: <NotFound />
  }
]);

export function AdminRouter() {
  return <RouterProvider router={ router } />
}