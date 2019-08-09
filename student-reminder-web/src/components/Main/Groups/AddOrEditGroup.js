import React, { useEffect } from 'react';
import validate from '../../../helpers/validate';
import { useForm } from '../../../helpers/customHooks';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '../../global/Autocomplete';

function AddOrEditGroup({ open, setOpen, groupId, setGroupId, groups, errors }) {

  const {
    values,
    handleChange,
    handleSubmit,
    setValues
  } = useForm(onSubmit, validate);

  useEffect(() => {
    setValues({
      releaseDate: null,
      dateOfCreation: null,
      groupName: "",
      groupLeader: undefined,
      groupCurator: undefined
    })
  }, [setValues]);

  function onSubmit(e) {
    if (groupId) return;
    else groups.create(values);

    // if (!Object.keys(errors.list).length) {
    //   setOpen(false);
    // }
  }

  function handleClose() {
    errors.setListToInitState();
    setOpen(false);
    setTimeout(() => {
      setGroupId('');
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
      <DialogTitle>{ groupId ? 'Update group' : 'Add a new group' }</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="none"
            id="name"
            label="Group name"
            type="text"
            fullWidth
            required
            onChange={e => handleChange(e.target.value, 'groupName')}
            error={!!errors.list.groupName}
            helperText={errors.list.groupName && errors.list.groupName.message}
          />
        </DialogContent>
        {
          groupId && 
            <>
              <Autocomplete
                options={[]}
                label="Group Curator"
                placeholder="Select a teacher"
                isLoading={true}
              />
              <Autocomplete 
                options={['a', 'b', 'c', 'd', 'e', 'ee']}
                label="Group Leader"
                placeholder="Select a student"
              />
            </>
        }
        <DialogContent>
          <TextField
            id="date"
            label="Date of creation"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={e => handleChange(e.target.value, 'dateOfCreation')}
            inputProps={{
              max: values.releaseDate
            }}
            required
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
            onChange={e => handleChange(e.target.value, 'releaseDate')}
            inputProps={{
              min: values.dateOfCreation
            }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            { groupId ? 'Update' : 'Create' }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default inject('errors', 'groups')(observer(AddOrEditGroup))