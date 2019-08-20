import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header({ auth }) {
  const classes = useStyles();
  const time = auth.setting.typeOfTime;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            KEP Schedule Control
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={time === 'full'}
                onChange={() => auth.updateSetting({ typeOfTime: time === 'full' ? 'short' : 'full' })}
                color="default"
              />
            }
            label={time === 'full' ? "Full time": "Short time"}
          >
          </FormControlLabel>
          <Button color="inherit" onClick={() => auth.signOut()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default inject('auth')(observer(Header))