import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Guest } from '../views/Guest/Guest.tsx';
import { LayoutAdmin } from '../layouts/LayoutAdmin/LayoutAdmin.tsx';
import { Login } from '../views/Login/Login.tsx';
import { RequireAuth } from './guards/RequireAuth.tsx';
import { AdminUsers, getAllUsersLoader } from '../views/Admin/Users/AdminUsers.tsx';
import { RequireGuest } from './guards/RequireGuest.tsx';
import { RequireAdmin } from './guards/RequireAdmin.tsx';
import { RequireNotAuth } from './guards/RequireNotAuth.tsx';
import { NotFound } from '../views/NotFound/NotFound.tsx';
import { AdminCrudActions } from '../views/Admin/CrudActions/AdminCrudActions.tsx';
import { Home } from '../views/Home/Home.tsx';
import { Countries, getAllCountriesLoader } from '../views/Admin/CrudActions/Countries/Countries.tsx';
import { Entities, getAllEntitiesLoader } from '../views/Admin/CrudActions/Entities/Entities.tsx';
import { BusinessModel, getAllBusinessModelsLoader } from '../views/Admin/CrudActions/BusinessModel/BusinessModel.tsx';
import { getAllPrioritiesLoader, Priorities } from '../views/Admin/CrudActions/Priorities/Priorities.tsx';
import { Companies, getAllCompaniesLoader } from '../views/Admin/CrudActions/Companies/Companies.tsx';
import { Currencies, getAllCurrenciesLoader } from '../views/Admin/CrudActions/Currencies/Currencies.tsx';
import { getAllRolesLoader, Roles } from '../views/Admin/CrudActions/Roles/Roles.tsx';
import { CreateCompany } from '../views/Admin/CrudActions/Companies/views/CreateCompany.tsx';
import {
  EditCompany,
  getAllEntitiesAndCompaniesLoader
} from '../views/Admin/CrudActions/Companies/views/EditCompany.tsx';
import {
  CreateCurrency,
  getAllCountriesAndAcronymsLoader
} from '../views/Admin/CrudActions/Currencies/views/CreateCurrency.tsx';
import { EditCurrency } from '../views/Admin/CrudActions/Currencies/views/EditCurrency.tsx';
import { IntersticialCreate } from '../views/Intersticials/views/IntersticialCreate.tsx';
import { IntersticialHome } from '../views/Intersticials/views/IntersticialHome.tsx';
import { creativesCreateLoader } from '../views/Intersticials/components/steps/StepOne.tsx';
import { Intersticials } from '../views/Intersticials/Intersticials.tsx';

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
        <Route path="guest" element={ <RequireGuest /> }>
          <Route index element={ <Guest /> } />
        </Route>
        <Route path="admin" element={ <RequireAdmin /> }>

          <Route element={ <LayoutAdmin /> }>
            <Route index element={ <Home /> } />
            <Route path="creatives-create" element={ <IntersticialCreate /> } />

            <Route path="creatives" element={ <Intersticials /> } >
              <Route index element={ <IntersticialHome /> } />
              <Route path="create" element={ <IntersticialCreate /> } loader={ creativesCreateLoader } />
            </Route>

            <Route path="users" element={ <AdminUsers /> } loader={ getAllUsersLoader } />
          </Route>

          <Route path="crud-actions" element={ <AdminCrudActions /> }>
            <Route index element={ <Countries /> } loader={ getAllCountriesLoader } />
            <Route path="entities" element={ <Entities /> } loader={ getAllEntitiesLoader }  />
            <Route path="business-model" element={ <BusinessModel /> } loader={ getAllBusinessModelsLoader } />
            <Route path="priorities" element={ <Priorities /> } loader={ getAllPrioritiesLoader } />

            <Route path="companies">
              <Route index element={ <Companies /> } loader={ getAllCompaniesLoader } />
              <Route path="create" element={ <CreateCompany /> } />
              <Route path="edit" element={ <EditCompany /> } loader={ getAllEntitiesAndCompaniesLoader } />
            </Route>

            <Route path="currencies">
              <Route index element={ <Currencies /> } loader={ getAllCurrenciesLoader } />
              <Route path="create" element={ <CreateCurrency /> } loader={ getAllCountriesAndAcronymsLoader } />
              <Route path="edit" element={ <EditCurrency /> } loader={ getAllCountriesAndAcronymsLoader } />
            </Route>

            <Route path="roles" element={ <Roles /> } loader={ getAllRolesLoader } />
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