import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Layout from '@/layout/Layout';
import Home from '@/features/home';
import NotFound from '@/NotFound';
import PrivateRoute from './PrivateRoute';

const RouterElement = () => (
  <>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    >
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </>
);

const router = createBrowserRouter(createRoutesFromElements(RouterElement()));

const Router = () => <RouterProvider router={router} />;

export default Router;
