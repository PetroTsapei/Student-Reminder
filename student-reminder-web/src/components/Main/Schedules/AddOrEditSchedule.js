import React from 'react';
import validate from '../../../helpers/validate';
import { useForm } from '../../../helpers/customHooks';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ScheduleApi from '../../../api/schedules';

function AddOrEditSchedule({ open, setOpen, scheduleId }) {

  return (
    <Dialog
      scroll="paper"
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>{ scheduleId ? 'Update schedule' : 'Add a new schedule' }</DialogTitle>
    </Dialog>
  )
}

export default AddOrEditSchedule