import React from 'react';
import { Switch } from 'react-router-native';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

export default MainRouter = () => (
  <Switch>
    { false && PrivateRoutes() }
    { PublicRoutes() }
  </Switch>
)