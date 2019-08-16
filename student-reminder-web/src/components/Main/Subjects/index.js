import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
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

function SubjectList(item) {
  const [isEditable, setIsEditable] = useState(false);

  function handleEdit() {
    setIsEditable(!isEditable);
  }

  return (
    <ListItem>
      {
        isEditable ?
          <TextField
            required
            value="Single-line item"
            margin="none"
            placeholder="Subject name"
          />
            :
          <ListItemText
            primary="Single-line item"
          />
      }
      <ListItemSecondaryAction>
        <IconButton onClick={handleEdit}>
          { isEditable ? <CheckIcon /> : <EditIcon /> }
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

function Subjects({ subjects, routing }) {

  useEffect(() => {
    const page = new URLSearchParams(routing.location.search).get('page') || undefined;
    subjects.getSubjects(page);

    return () => {
      subjects.setToInitState();
    }

  }, []);

  return (
    <Grid item xs={12} md={6}>
      <List dense>
        { subjects.subjectList.map((item, key) => <SubjectList item={item} key={key}/>) }
      </List>
    </Grid>
  )
}

export default inject('subjects', 'routing')(observer(Subjects))