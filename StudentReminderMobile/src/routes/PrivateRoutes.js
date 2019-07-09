import React from 'react';
import {View, Text} from 'react-native';
import { Route } from 'react-router-native';
import { Home } from '../components/Home';

const routes = [
  {
    path: ['/', '/:settings'],
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