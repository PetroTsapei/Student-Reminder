import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

function AlertDialog({ confirmBtnText, title, message, removeFromStore }) {
  const [open, setOpen] = React.useState(true);

  function handleClose() {
    setOpen(false);
    removeFromStore();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          { message }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          { confirmBtnText }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Modal({ alerts }) {
  return (
    <Fragment>
      {
        Object.values(alerts.alertsObj).map(alertData => (
          <AlertDialog
            key={alertData.id}
            removeFromStore={() => alerts.removeFromStore(alertData.id)}
            {...alertData}
          />
        ))
      }
    </Fragment>
  )
}

Modal.propTypes = {
  alerts: PropTypes.object
};

export default inject('alerts')(observer(Modal))
