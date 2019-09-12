import React from 'react';
import withRouterStore from '../helpers/withRouterStore';
import { Route } from 'react-router-native';

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import routerStore from '../stores/RouterStore';

const routes = [
  {
    path: "/",
    exact: true,
    component: withRouterStore(routerStore)(SignIn)
  },
  {
    path: "/sign-up",
    exact: true,
    component: withRouterStore(routerStore)(SignUp)
  },
];

const PublicRoutes = () => (
  routes.map((route, i) => <Route key={i} {...route}/>)
);

export default PublicRoutes;
