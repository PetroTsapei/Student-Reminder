import React, { useRef, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AddSubject({ open, setOpen, errors, subjects }) {
  const inputEl = useRef(null);

  useEffect(() => {
    if (subjects.closeModal) handleClose();

    return () => {
      errors.setListToInitState()
    }
  }, [subjects.closeModal]);

  function handleSubmit(e) {
    e.preventDefault();
    subjects.create({ name: inputEl.current.value });
  }

  function handleClose() {
    errors.setListToInitState();
    setOpen(false);
  }

  function handleChange() {
    errors.setListToInitState();
  }


  return (
    <Dialog
      scroll="paper"
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>Add subject</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="none"
            name="name"
            label="Subject name"
            type="text"
            onChange={handleChange}
            fullWidth
            required
            inputRef={inputEl}
            error={!!errors.list.name}
            helperText={errors.list.name && errors.list.name.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default inject('errors', 'subjects')(observer(AddSubject))