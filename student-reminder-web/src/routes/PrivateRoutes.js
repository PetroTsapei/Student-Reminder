import React from 'react';
import { Route } from 'react-router';

import NotFound from '../components/global/NotFound';

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <p>welcome</p>
  },
  {
    path: "/wishlists",
    exact: true,
    component: () => <p>wish list</p>
  },
  {
    path: "/:notFound",
    component: NotFound,
  }
];

const PrivateRoutes = () => (
  routes.map((route, i) => <Route key={i} {...route}/>)
);

export default PrivateRoutes;