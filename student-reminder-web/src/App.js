import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import MainRouter from './routes';
import Header from '../src/components/global/Header';
import { inject, observer } from 'mobx-react';

function App(props) {
  const unavaliableLinks = ['/', '/sign-up'];

  return (
    <Fragment>
      {
        (!unavaliableLinks.includes(props.routing.location.pathname)) &&
          <Header/>
      }
      <Route component={MainRouter} />
    </Fragment>
  );
}

export default inject('routing')(observer(App));
