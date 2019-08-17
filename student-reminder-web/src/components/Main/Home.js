import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../global/Header';
import BottomNavigation from '../global/BottomNavigation';
import GroupList from './Groups/GroupList';
import StudentList from './Students/StudentList';
import Subjects from './Subjects';
import Schedules from './Schedules';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    marginTop: '1rem',
    marginBottom: '1rem'
  },
});

export default function Home({ history, match }) {
  const classes = useStyles();

  function _renderForm() {
    switch(history.location.pathname) {
      case '/':
        return <GroupList />;
      case '/subjects': return <Subjects />;
      case '/schedules': return <Schedules />;
      case '/lessons': return;
      default: return <StudentList goBack={history.goBack} groupId={match.params.groupId} />
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