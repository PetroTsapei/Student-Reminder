import React from 'react';
import { Route } from 'react-router';

import Home from '../components/Main/Home';
import NotFound from '../components/global/NotFound';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
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