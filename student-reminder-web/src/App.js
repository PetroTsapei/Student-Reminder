import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MainRouter from './routes';
import Modal from '../src/components/global/Modal';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Route component={MainRouter} />
      <Modal />
    </div>
  );
}

export default App
