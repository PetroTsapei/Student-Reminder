import React, { useEffect, useState } from 'react';
import { inject, observer } from "mobx-react";
import validate from '../../../helpers/validate';
import { useForm } from '../../../helpers/customHooks';
import handleError from '../../../helpers/handleError';
import '../../../helpers/weekOfMonth';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete from '../../global/Autocomplete';
import moment from 'moment';
import SubjectApi from '../../../api/subjects';
import GroupApi from '../../../api/groups';
import AuthApi from '../../../api/auth';
import ScheduleApi from '../../../api/schedules';

function AddOrEditLesson({ open, setOpen, lessonId, setLessonId, errors, auth, lessons }) {
  const [loading, setLoading] = useState('');
  const {
    values,
    handleChange,
    handleSubmit,
    setValues
  } = useForm(onSubmit, validate);

  useEffect(() => {
    setValues({
      subjects: [],
      groups: [],
      teachers: [],
      schedules: [],
      weekOfMonth: new Date().getWeekOfMonth()
    })
  }, [open]);

  async function fetchSubjects() {
    try {
      setLoading('subjects');
      let result = await SubjectApi.getSubjects(auth.token);

      handleChange(
        result.subjects.map(elem => ({
          value: elem._id,
          label: elem.name,
        })), 'subjects'
      )

    } catch (error) {
      handleError(error);
    } finally {
      setLoading('');
    }
  }

  async function fetchGroups() {
    try {
      setLoading('groups');
      let result = await GroupApi.getAll(auth.token);

      handleChange(
        result.map(elem => ({
          value: elem._id,
          label: elem.groupName
        })), 'groups'
      )

    } catch (error) {
      handleError(error);
    } finally {
      setLoading('');
    }
  }

  async function fetchTeachers() {
    try {
      setLoading('teachers');
      let result = await AuthApi.getTeachers(auth.token);

      handleChange(
        result.map(elem => ({
          value: elem._id,
          label: elem.fullName
        })), 'teachers'
      )

    } catch (error) {
      handleChange(error)
    } finally {
      setLoading('');
    }
  }

  async function fetchSchedules() {
    try {
      setLoading('schedules');
      let result = await ScheduleApi.getSchedules(auth.token);
      handleChange(
        result.schedules.map(elem => ({
          value: elem._id,
          label: `${moment.weekdays(elem.dayOfWeek)} (${moment(elem.startTime).format('HH:mm')} - ${moment(elem.endTime).format('HH:mm')}) - ${elem.numberInSchedule}`
        })), 'schedules'
      )

    } catch (error) {
      handleChange(error)
    } finally {
      setLoading('');
    }
  }

  function onSubmit() {
    if (lessonId) return
    else lessons.create(values);
  }

  function handleClose() {
    errors.setListToInitState();
    setOpen(false);
    setTimeout(() => {
      setLessonId('');
    }, 200);
  }

  return (
    <Dialog
      scroll="paper"
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>{ lessonId ? 'Update lesson' : 'Add a new lesson' }</DialogTitle>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          options={values.groups}
          label="Group"
          placeholder="Select a group name"
          onFocus={fetchGroups}
          isLoading={loading === 'groups'}
          required
          error
          isValid={false}
        />
        <Autocomplete
          options={values.subjects}
          label="Subject"
          placeholder="Select a subject name"
          onFocus={fetchSubjects}
          isLoading={loading === 'subjects'}
        />
        <Autocomplete
          options={values.teachers}
          label="Teacher"
          placeholder="Select a teacher full name"
          onFocus={fetchTeachers}
          isLoading={loading === 'teachers'}
        />
        <Autocomplete
          options={values.schedules}
          label="Schedule"
          placeholder="Select schedule for this lesson"
          onFocus={fetchSchedules}
          isLoading={loading === 'schedules'}
        />
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel htmlFor="weekOfMonth">Week of month</InputLabel>
            <Select
              value={values.weekOfMonth}
              onChange={e => handleChange(e.target.value, 'weekOfMonth')}
              inputProps={{
                name: 'weekOfMonth',
                id: 'weekOfMonth',
              }}
            >
              <MenuItem value="1">First week</MenuItem>
              <MenuItem value="2">Second week</MenuItem>
              <MenuItem value="3">Third week</MenuItem>
              <MenuItem value="4">Fourth week</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            { lessonId ? 'Update' : 'Create' }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default inject('errors', 'auth', 'lessons')(observer(AddOrEditLesson))