import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Guest } from '../views/Guest/Guest.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Guest />,
  }
]);

export function GuestRouter() {
  return <RouterProvider router={ router } />
}