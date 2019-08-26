import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function GroupList({ group, edit, deleteItem }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link underline='none' component={RouterLink} to={`/students/${group._id}`}>
        <Paper className={classes.paper}>
          <Grid item>
            <Typography gutterBottom variant="subtitle1">
              { group.groupName }
            </Typography>
            <Typography>
              Create - release dates:
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary">
              {`${moment(group.dateOfCreation).format('DD/MM/YYYY')} - ${moment(group.releaseDate).format('DD/MM/YYYY')}` }
            </Typography>
            <Typography>
              Group curator:
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary">
              { group.groupCurator || '-' }
            </Typography>
            <Typography>
                Group leader:
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary">
              { group.groupLeader || '-' }
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
      </Link>
    </Grid>
  )
}