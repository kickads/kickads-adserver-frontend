import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Guest } from '../views/Guest/Guest.tsx';
import { LayoutAdmin } from '../layouts/LayoutAdmin/LayoutAdmin.tsx';
import { Admin } from '../views/Admin/Admin.tsx';
import { Login } from '../views/Login/Login.tsx';
import { RequireAuth } from './guards/RequireAuth.tsx';
import { AdminUsers, getAllUsersLoader } from '../views/Admin/Users/AdminUsers.tsx';
import { RequireGuest } from './guards/RequireGuest.tsx';
import { RequireAdmin } from './guards/RequireAdmin.tsx';
import { RequireNotAuth } from './guards/RequireNotAuth.tsx';
import { NotFound } from '../views/NotFound/NotFound.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={ <NotFound /> }>
      <Route index element={
        <RequireNotAuth>
          <Login />
        </RequireNotAuth>
      }
      />

      <Route element={ <RequireAuth /> } >
        <Route path="guest" element={ <RequireGuest /> } >
          <Route index element={ <Guest /> } />
        </Route>
        <Route path="admin" element={ <RequireAdmin /> } >
          <Route element={ <LayoutAdmin /> } >
            <Route index element={ <Admin /> } />
            <Route path="users" element={ <AdminUsers /> } loader={ getAllUsersLoader }/>
          </Route>
        </Route>
      </Route>

    </Route>
  )
);

// [
// {
//   path: '/',
//   errorElement: <NotFound />,
//   children: [
//     {
//       index: true,
//       element: <RequireNotAuth> <Login /> </RequireNotAuth>
//     },
//     // {
//     //   path: 'login',
//     //   element: <Login />
//     // },
//     {
//       element: <RequireAuth />,
//       children: [
//         {
//           path: 'guest',
//           element: <RequireGuest />,
//           children: [
//             {
//               index: true,
//               element: <Guest />
//             }
//           ]
//         },
//         {
//           path: 'admin',
//           element: <RequireAdmin />,
//           children: [
//             {
//               element: <LayoutAdmin />,
//               children: [
//                 {
//                   index: true,
//                   element: <Admin />
//                 },
//                 {
//                   path: 'users',
//                   element: <AdminUsers />
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
//   }
// ]

export function AppRouter() {
  return <RouterProvider router={ router } />
}