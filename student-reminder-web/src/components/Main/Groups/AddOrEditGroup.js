import React, { useEffect, useState } from 'react';
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
import GroupApi from '../../../api/groups';
import AuthApi from '../../../api/auth';
import StudentApi from '../../../api/students';
import handleError from '../../../helpers/handleError';
import moment from 'moment';

function AddOrEditGroup({ open, setOpen, groupId, setGroupId, groups, errors, auth }) {
  const [loading, setLoading] = useState('');
  const [options, setOptions] = useState({});

  const {
    values,
    handleChange,
    handleSubmit,
    setValues
  } = useForm(onSubmit, validate);

  useEffect(() => {
    if (groups.closeModal) handleClose();

    setValues({
      releaseDate: null,
      dateOfCreation: null,
      groupName: "",
      groupLeader: undefined,
      groupCurator: undefined
    });

    if (groupId && open) GroupApi.getById({
      token: auth.token,
      id: groupId
    }).then(doc => {
      setValues(doc);
    })
    .catch(error => handleError(error))

  }, [open, groups.closeModal]);

  function onSubmit(e) {
    if (groupId) return;
    else groups.create(values);
  }

  function handleClose() {
    errors.setListToInitState();
    setOpen(false);
    setTimeout(() => {
      setGroupId('');
    }, 200);
  }
  
  async function fetchCurators() {
    try {
      setLoading('curators');
      let result = await AuthApi.getCurators(auth.token, 'free', groupId);

      setOptions({
        ...options,
        ['curators']: result.map(elem => ({
          value: elem._id,
          label: elem.fullName
        }))
      })

    } catch (error) {
      handleError(error);
    } finally {
      setLoading('');
    }
  }

  async function fetchGroupStudents() {
    try {
      setLoading('students');
      let data = await StudentApi.getByGroupId({ token: auth.token, groupId });

      setOptions({
        ...options,
        ['students']: data.result.map(elem => ({
          value: elem._id,
          label: elem.fullName
        }))
      })

    } catch (error) {
      handleError(error);
    } finally {
      setLoading('');
    }
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
            value={values.groupName}
            onChange={e => handleChange(e.target.value, 'groupName')}
            error={!!errors.list.groupName}
            helperText={errors.list.groupName && errors.list.groupName.message}
          />
        </DialogContent>
        {
          groupId && 
            <>
              <Autocomplete
                options={options.curators}
                label="Group Curator"
                placeholder="Select a teacher"
                onFocus={fetchCurators}
                isLoading={loading === 'curators'}
                value={values.groupCurator}
                onChange={val => handleChange(val, 'groupCurator')}
              />
              <Autocomplete 
                options={options.students}
                label="Group Leader"
                placeholder="Select a student"
                onFocus={fetchGroupStudents}
                isLoading={loading === 'students'}
                value={values.groupLeader}
                onChange={val => handleChange(val, 'groupLeader')}
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
            value={values.dateOfCreation ? moment(values.dateOfCreation).format('YYYY-MM-DD') : ''}
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
            value={values.releaseDate ? moment(values.releaseDate).format('YYYY-MM-DD') : ''}
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

export default inject('errors', 'groups', 'auth')(observer(AddOrEditGroup))