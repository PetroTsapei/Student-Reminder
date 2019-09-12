import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import LessonListItem from './LessonListItem';
import AddOrEditLesson from './AddOrEditLesson';
import NotFound from '../../global/NotFound';

const useStyles = makeStyles(theme => ({
  fixed: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(3),
  },
}));

function Lessons({ lessons }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [lessonId, setLessonId] = useState('');

  useEffect(() => {
    lessons.getAll();
  }, []);

  function editHandler(id) {
    setLessonId(id);
    setOpen(true);
  }

  function _renderLessonList() {
    if (lessons.lessonList.length) {
      return lessons.lessonList.map(elem => (
        <LessonListItem
          edit={e => {
            e.preventDefault();
            editHandler(elem._id);
          }}
          key={elem._id}
          lesson={elem}
          deleteItem={() => lessons.delete(elem._id)}
        />
      ))
    } else return <NotFound />
  }

  return(
    <Grid container spacing={3}>
      { _renderLessonList() }
      <Tooltip title="Add a new lesson" aria-label="add">
        <Fab color="primary" className={classes.fixed} onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <AddOrEditLesson
        open={open}
        setOpen={setOpen}
        lessonId={lessonId}
        setLessonId={setLessonId}
      />
    </Grid>
  )
}

export default inject('lessons')(observer(Lessons))