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
import LessonApi from '../../../api/lessons';

function AddOrEditLesson({ open, setOpen, lessonId, setLessonId, errors, auth, lessons }) {
  const [loading, setLoading] = useState('');
  const [options, setOptions] = useState({});
  const {
    values,
    handleChange,
    handleSubmit,
    setValues
  } = useForm(onSubmit, validate, errors);

  useEffect(() => {
    if (lessons.closeModal) handleClose();

    setValues({
      subject: null,
      group: null,
      teacher: null,
      schedule: null,
      weekOfMonth: {
        value: new Date().getWeekOfMonth()
      }
    });

    if (lessonId && open) LessonApi.getById(
      auth.token,
      lessonId
    ).then(doc => {
      setValues(doc)
    })
    .catch(error => handleError(error))

  }, [open, lessons.closeModal]);

  async function fetchSubjects() {
    try {
      setLoading('subjects');
      let result = await SubjectApi.getSubjects(auth.token);

      setOptions({
        ...options,
        ['subjects']: result.subjects.map(elem => ({
          value: elem._id,
          label: elem.name,
        }))
      })

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

      setOptions({
        ...options,
        ['groups']: result.map(elem => ({
          value: elem._id,
          label: elem.groupName
        }))
      })

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

      setOptions({
        ...options,
        ['teachers']: result.map(elem => ({
          value: elem._id,
          label: elem.fullName
        }))
      })

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
      setOptions({
        ...options,
        ['schedules']: result.schedules.map(elem => ({
          value: elem._id,
          label: `${moment.weekdays(elem.dayOfWeek)} (${moment(elem.startTime).format('HH:mm')} - ${moment(elem.endTime).format('HH:mm')}) - ${elem.numberInSchedule}`
        }))
      })

    } catch (error) {
      handleChange(error)
    } finally {
      setLoading('');
    }
  }

  function onSubmit() {
    let data = {};

    for (let key in values) {
      data[key] = values[key] && values[key].value;
    }

    if (lessonId) lessons.update(lessonId, data);
    else lessons.create(data);
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
          options={options.groups}
          value={values.group}
          label="Group"
          placeholder="Select a group name"
          onFocus={fetchGroups}
          isLoading={loading === 'groups'}
          required
          error={!!errors.list.group}
          helperText={errors.list.group && errors.list.group.message}
          onChange={val => handleChange(val, 'group')}
        />
        <Autocomplete
          options={options.subjects}
          value={values.subject}
          label="Subject"
          placeholder="Select a subject name"
          onFocus={fetchSubjects}
          isLoading={loading === 'subjects'}
          error={!!errors.list.subject}
          helperText={errors.list.subject && errors.list.subject.message}
          onChange={val => handleChange(val, 'subject')}
        />
        <Autocomplete
          options={options.teachers}
          value={values.teacher}
          label="Teacher"
          placeholder="Select a teacher full name"
          onFocus={fetchTeachers}
          isLoading={loading === 'teachers'}
          error={!!errors.list.teacher}
          helperText={errors.list.teacher && errors.list.teacher.message}
          onChange={val => handleChange(val, 'teacher')}
        />
        <Autocomplete
          options={options.schedules}
          value={values.schedule}
          label="Schedule"
          placeholder="Select schedule for this lesson"
          onFocus={fetchSchedules}
          isLoading={loading === 'schedules'}
          error={!!errors.list.schedule}
          helperText={errors.list.schedule && errors.list.schedule.message}
          onChange={val => handleChange(val, 'schedule')}
        />
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel htmlFor="weekOfMonth">Week of month</InputLabel>
            <Select
              value={values.weekOfMonth && values.weekOfMonth.value}
              onChange={e => handleChange({ value: +e.target.value }, 'weekOfMonth')}
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