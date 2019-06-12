import React from 'react';
import { Route } from 'react-router';

import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import NotFound from '../components/global/NotFound';

const routes = [
  {
    path: "/",
    exact: true,
    component: SignIn
  },
  {
    path: "/sign-up",
    exact: true,
    component: SignUp
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