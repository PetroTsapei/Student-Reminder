import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '../../global/Autocomplete';

export default function FormDialog({ open, setOpen, title }) {
  const [releaseDate, setReleaseDate] = useState();
  const [dateOfCreation, setDateOfCreation] = useState();

  function handleClose() {
    setOpen(false);
  }

  console.log(releaseDate);

  return (
    <Dialog 
      scroll="paper"
      open={open} 
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>{ title }</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="none"
          id="name"
          label="Group name"
          type="text"
          fullWidth
        />
      </DialogContent>
      <Autocomplete 
        options={['a', 'b', 'c', 'd', 'e', 'ee']}
        label="Group Curator"
        placeholder="Select a teacher"
      />
      <Autocomplete 
        options={['a', 'b', 'c', 'd', 'e', 'ee']}
        label="Group Leader"
        placeholder="Select a student"
      />
      <DialogContent>
        <TextField
          id="date"
          label="Date of creation"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          onChange={e => setDateOfCreation(e.target.value)}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          id="date"
          label="Release date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          onChange={e => setReleaseDate(e.target.value)}
          maxDate={dateOfCreation} // TODO min max date fix
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}