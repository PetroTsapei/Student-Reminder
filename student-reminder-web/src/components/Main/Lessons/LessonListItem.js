import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function LessonListItem({ edit, lesson, deleteItem }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper className={classes.paper}>
        <Grid item>

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