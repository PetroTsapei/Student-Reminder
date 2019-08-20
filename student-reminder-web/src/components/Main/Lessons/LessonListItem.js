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

export default function LessonListItem({ edit, lesson, deleteItem }) {
  const classes = useStyles();

  function validateWeekOfMonth(number) {
    switch (number) {
      case 1: return "First";
      case 2: return "Second";
      case 3: return "Third";
      case 4: return "Fourth";
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper className={classes.paper}>
        <Grid item>
          <Typography>
            Week of month:
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            { validateWeekOfMonth(lesson.weekOfMonth) }
          </Typography>
          <Typography>
            Schedule:
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            { `${moment.weekdays(lesson.schedule.dayOfWeek)} (${moment(lesson.schedule.startTime).format('HH:mm')} - ${moment(lesson.schedule.endTime).format('HH:mm')}) - ${lesson.schedule.numberInSchedule}` }
          </Typography>
          <Typography>
            Teacher:
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            { lesson.teacher }
          </Typography>
          <Typography>
            Group:
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            { lesson.group }
          </Typography>
          <Typography>
            Subject:
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            { lesson.subject }
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