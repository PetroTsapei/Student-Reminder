import React, { useEffect, useState, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import AddSubject from './AddSubject';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  fixed: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(3),
  },
}));

function SubjectList({ item, update, deleteItem }) {
  const [isEditable, setIsEditable] = useState(false);
  const inputEl = useRef(null);

  function handleEdit() {
    setIsEditable(!isEditable);

    if (isEditable) update(inputEl.current.value)
  }

  function handleCloseDelete() {
    if (isEditable) setIsEditable(false);
    else deleteItem();
  }

  return (
    <ListItem>
      {
        isEditable ?
          <TextField
            required
            defaultValue={item.name}
            margin="none"
            placeholder="Subject name"
            inputRef={inputEl}
          />
            :
          <ListItemText
            primary={item.name}
          />
      }
      <ListItemSecondaryAction>
        <IconButton onClick={handleEdit}>
          { isEditable ? <CheckIcon /> : <EditIcon /> }
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={handleCloseDelete}>
          { isEditable ? <CloseIcon /> : <DeleteIcon /> }
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

function Subjects({ subjects, routing }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const page = new URLSearchParams(routing.location.search).get('page') || undefined;
    subjects.getSubjects(page);

    return () => {
      subjects.setToInitState();
    }

  }, []);

  function _renderItems() {
    if (subjects.subjectList.length) return (
      subjects.subjectList.map((item, key) => (
        <SubjectList
          item={item}
          key={key}
          update={(name) => subjects.update({id: item._id, name})}
          deleteItem={() => subjects.delete(item._id)}
        />
      ))
    );
    else return <div>Not found</div>
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <List dense>
          { _renderItems() }
        </List>
      </Grid>
      <Tooltip title="Add subject" aria-label="add">
        <Fab color="primary" className={classes.fixed} onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <AddSubject
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  )
}

export default inject('subjects', 'routing')(observer(Subjects))