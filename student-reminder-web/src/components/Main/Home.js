import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../global/Header';
import BottomNavigation from '../global/BottomNavigation';
import GroupList from './Groups/GroupList';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    marginTop: '1rem',
    marginBottom: '1rem'
  },
});

export default function Home({ history }) {
  const classes = useStyles();

  function _renderForm() {
    switch(history.location.pathname) {
      case '/':
        return <GroupList />
      default: return
    }
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md" className={classes.root}>
        <CssBaseline />
        { _renderForm() }
      </Container>
      <BottomNavigation history={history} />
    </>
  )
}