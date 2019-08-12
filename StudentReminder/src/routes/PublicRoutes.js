import React from 'react';
import { Route } from 'react-router-native';

import { SignUp } from '../components/SignUp';
import { SignIn } from '../components/SignIn';

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
]

const PublicRoutes = () => (
  routes.map((route, i) => <Route key={i} {...route}/>)
);

export default PublicRoutes;