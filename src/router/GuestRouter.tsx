import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Guest, NotFound } from '../views';

const router = createBrowserRouter([
  {
    index: true,
    element: <Guest />,
    errorElement: <NotFound />
  }
]);

export function GuestRouter() {
  return <RouterProvider router={ router } />
}