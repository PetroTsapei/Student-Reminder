import React from 'react';
import withRouterStore from '../helpers/withRouterStore';
import { Route } from 'react-router-native';
import Home from '../components/Home';
import SignUp from '../components/SignUp';
import routerStore from '../stores/RouterStore';

const routes = [
  {
    path: "/sign-up",
    exact: true,
    component: withRouterStore(routerStore)(SignUp)
  },
  {
    path: ['/', '/:settings', '/:lessons'],
    exact: true,
    component: withRouterStore(routerStore)(Home)
  },
];

const PrivateRoutes = () => (
  routes.map((route, i) => <Route key={i} {...route}/>)
);

export default PrivateRoutes;
