import 'date-fns';
import React, { useEffect } from 'react';
import validate from '../../../helpers/validate';
import { useForm } from '../../../helpers/customHooks';
import handleError from "../../../helpers/handleError";
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ScheduleApi from '../../../api/schedules';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  timePickerRight: {
    marginLeft: "0.5rem",
    width: "100%"
  },
  timePickerLeft: {
    marginRight: "0.5rem",
    width: "100%"
  },
  timePickerWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  formControl: {
    minWidth: "100%",
  }
}));

function AddOrEditSchedule({ open, setOpen, scheduleId, setScheduleId, errors, schedules, auth }) {
  const classes = useStyles();
  const {
    values,
    handleChange,
    handleSubmit,
    setValues
  } = useForm(onSubmit, validate, errors);

  useEffect(() => {
    if (schedules.closeModal) handleClose();
    let date = new Date();
    const lessonTime = 80;

    setValues({
      startTime: new Date(),
      endTime: new Date(date.setMinutes(date.getMinutes() + lessonTime)),
      typeOfTime: "full",
      numberInSchedule: "",
      dayOfWeek: new Date().getDay()
    });

    if (scheduleId) ScheduleApi.getById(
      auth.token,
      scheduleId
    ).then(doc => {
      setValues(doc);
    })
    .catch(error => handleError(error))

  }, [open, schedules.closeModal]);

  function onSubmit() {
    if (scheduleId) schedules.update(scheduleId, values);
    else schedules.create(values);
  }

  function handleClose() {
    errors.setListToInitState();
    setOpen(false);
    setTimeout(() => {
      setScheduleId('');
    }, 200);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        scroll="paper"
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>{ scheduleId ? 'Update schedule' : 'Add a new schedule' }</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.timePickerWrapper}>
            <KeyboardTimePicker
              className={classes.timePickerLeft}
              margin="normal"
              label="Start time"
              value={values.startTime}
              onChange={time => handleChange(time, 'startTime')}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              ampm={false}
            />
            <KeyboardTimePicker
              className={classes.timePickerRight}
              margin="normal"
              label="End time"
              value={values.endTime}
              onChange={time => handleChange(time, 'endTime')}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              ampm={false}
            />
          </DialogContent>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="typeOfTime">Type of time</InputLabel>
              <Select
                value={values.typeOfTime}
                onChange={e => handleChange(e.target.value, 'typeOfTime')}
                inputProps={{
                  name: 'typeOfTime',
                  id: 'typeOfTime',
                }}
              >
                <MenuItem value="full">Full time</MenuItem>
                <MenuItem value="short">Short time</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogContent>
            <TextField
              fullWidth
              label="Number in schedule"
              value={values.numberInSchedule}
              onChange={e => handleChange(e.target.value, 'numberInSchedule')}
              type="number"
              margin="normal"
              required
              error={!!errors.list.numberInSchedule}
              helperText={errors.list.numberInSchedule && errors.list.numberInSchedule.message}
            />
          </DialogContent>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="dayOfWeek">Day of week</InputLabel>
              <Select
                value={values.dayOfWeek}
                onChange={e => handleChange(e.target.value, 'dayOfWeek')}
                inputProps={{
                  name: "dayOfWeek",
                  id: "dayOfWeek"
                }}
              >
                <MenuItem value="1">Monday</MenuItem>
                <MenuItem value="2">Tuesday</MenuItem>
                <MenuItem value="3">Wednesday</MenuItem>
                <MenuItem value="4">Thursday</MenuItem>
                <MenuItem value="5">Friday</MenuItem>
                <MenuItem value="6">Saturday</MenuItem>
                <MenuItem value="0">Sunday</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              { scheduleId ? 'Update' : 'Create' }
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </MuiPickersUtilsProvider>
  )
}

export default inject('errors', 'schedules', 'auth')(observer(AddOrEditSchedule))