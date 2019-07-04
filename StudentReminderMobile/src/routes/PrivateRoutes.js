import React from 'react';
import {View, Text} from 'react-native';
import { Route } from 'react-router-native';

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <View><Text>welcome</Text></View>
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