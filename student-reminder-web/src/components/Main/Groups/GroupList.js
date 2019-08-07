import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import GroupListItem from './GroupListItem';
import AddOrEditGroup from './AddOrEditGroup';

const useStyles = makeStyles(theme => ({
  fixed: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(3),
  },
}));

function GroupList({ groups }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    groups.getAll();

    return () => groups.setListToInitState();
  }, [groups])

  function _renderGroupList() {
    if (groups.groupList.length) {
      return groups.groupList.map(elem => <GroupListItem key={elem._id} group={elem} /> )
    } else return (
      <div>Not found</div>
    )
  }

  return (
    <Grid container spacing={3}>
      { _renderGroupList() }
      <Tooltip title="Add new group" aria-label="add">
        <Fab color="primary" className={classes.fixed} onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <AddOrEditGroup title="Add a new group" open={open} setOpen={setOpen} />
    </Grid>
  )
}

export default inject('groups')(observer(GroupList))