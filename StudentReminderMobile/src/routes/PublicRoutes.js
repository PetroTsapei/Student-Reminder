import React from 'react';
import { Route } from 'react-router-native';

import { SignUp } from '../components/SignUp';

const routes = [
  {
    path: "/",
    exact: true,
    component: SignUp
  },
  {
    path: "/sign-up/phone",
    exact: true,
    component: SignUp
  },
]

const PublicRoutes = () => (
  routes.map((route, i) => <Route key={i} {...route}/>)
);

export default PublicRoutes;