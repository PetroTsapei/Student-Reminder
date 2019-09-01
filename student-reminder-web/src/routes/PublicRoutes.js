import React from 'react';
import { Route } from 'react-router';

import SignIn from '../components/Auth/SignIn';
import NotFound from '../components/global/NotFound';
import Redirect from '../components/global/Redirect';

const routes = [
  {
    path: "/",
    exact: true,
    component: SignIn
  },
  {
    path: "/redirect",
    component: Redirect
  },
  {
    path: "/:notFound",
    component: NotFound,
  }
];

const PublicRoutes = () => (
  routes.map((route, i) => <Route key={i} {...route}/>)
);

export default PublicRoutes;
