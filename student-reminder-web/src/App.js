import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import MainRouter from './routes';
import Header from '../src/components/global/Header';
import Modal from '../src/components/global/Modal';
import { inject, observer } from 'mobx-react';

function App({ auth }) {
  return (
    <Fragment>
      { auth.token && <Header/> }
      <Route component={MainRouter} />
      <Modal />
    </Fragment>
  );
}

export default inject('auth')(observer(App));
