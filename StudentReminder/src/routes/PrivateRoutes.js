import React from 'react';
import {View, Text} from 'react-native';
import { Route } from 'react-router-native';
import { Home } from '../components/Home';
import { SignUp } from '../components/SignUp';

const routes = [
  {
    path: "/sign-up",
    exact: true,
    component: SignUp
  },
  {
    path: ['/', '/:settings', '/:lessons'],
    exact: true,
    component: Home
  },
  {
    path: "/lessons",
    component: () => <View><Text>lessons</Text></View>
  },
];

const PrivateRoutes = () => (
  routes.map((route, i) => <Route key={i} {...route}/>)
);

export default PrivateRoutes;