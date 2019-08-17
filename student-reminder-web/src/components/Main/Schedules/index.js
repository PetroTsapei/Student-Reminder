import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import ScheduleList from './ScheduleList';
import AddOrEditSchedule from './AddOrEditSchedule';

const useStyles = makeStyles(theme => ({
  fixed: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(3),
  },
}));

function Schedules({ schedules, routing }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [scheduleId, setScheduleId] = useState('');

  useEffect(() => {
    const page = new URLSearchParams(routing.location.search).get('page') || undefined;
    schedules.getAll(page);

    return () => schedules.setToInitState();
  }, [schedules]);

  function editHandler(id) {
    setScheduleId(id);
    setOpen(true);
  }

  function _renderScheduleList() {
    if (schedules.scheduleList.length) {
      return schedules.scheduleList.map(elem => (
        <ScheduleList
          edit={e => {
            e.preventDefault();
            editHandler(elem._id);
          }}
          key={elem._id}
          schedule={elem}
        />
      ))
    } else return <div>Not found</div>
  }

  return (
    <Grid container spacing={3}>
      { _renderScheduleList() }
      <Tooltip title="Add a new schedule" aria-label="add">
        <Fab color="primary" className={classes.fixed} onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <AddOrEditSchedule
        open={open}
        setOpen={setOpen}
        scheduleId={scheduleId}
      />
    </Grid>
  )
}

export default inject('schedules', 'routing')(observer(Schedules))