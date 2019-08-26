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
  const [groupId, setGroupId] = useState('');

  useEffect(() => {
    groups.getAll();

    return () => groups.setListToInitState();
  }, [groups]);

  function editHandler(id) {
    setGroupId(id);
    setOpen(true);
  }

  function _renderGroupList() {
    if (groups.groupList.length) {
      return groups.groupList.map(elem => (
        <GroupListItem
          edit={e => {
            e.preventDefault();
            editHandler(elem._id);
          }}
          key={elem._id}
          group={elem}
          deleteItem={e => {
            e.preventDefault();
            groups.delete(elem._id);
          }}
        />
      ))
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
      <AddOrEditGroup
        groupId={groupId} 
        open={open} 
        setOpen={setOpen}
        setGroupId={setGroupId}
      />
    </Grid>
  )
}

export default inject('groups')(observer(GroupList))