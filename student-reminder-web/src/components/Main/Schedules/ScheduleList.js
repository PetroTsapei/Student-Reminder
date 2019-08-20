import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function ScheduleList({ edit, schedule, deleteItem }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper className={classes.paper}>
        <Grid item>
          <Typography gutterBottom variant="subtitle1">
            { moment.weekdays(schedule.dayOfWeek) }
          </Typography>
          <Typography>
            Number in schedule:
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            { schedule.numberInSchedule }
          </Typography>
          <Typography>
            Start - end times:
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            {`${moment(schedule.startTime).format('HH:mm')} - ${moment(schedule.endTime).format('HH:mm')}` }
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={edit}>
            <Icon>edit_icon</Icon>
          </IconButton>
          <IconButton onClick={deleteItem}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Paper>
    </Grid>
  )
}
