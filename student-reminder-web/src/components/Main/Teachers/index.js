import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { findNumbers } from 'libphonenumber-js';
import { globalAlertsStore } from '../../../stores/GlobalAlertsStore';
import AuthApi from '../../../api/auth';
import MaterialTable from 'material-table';
import handleError from '../../../helpers/handleError';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  tableWrapper: {
    marginTop: '2rem',
    maxWidth: "100%"
  }
}));

function Teachers({ teachers, auth }) {
  const classes = useStyles();

  useEffect(() => {
    teachers.getTeachers();

    return () => {
      teachers.setToInitState();
    }
  }, [teachers]);

  function onRowAddUpdate(newData, oldData) {
    return new Promise(async (resolve, reject) => {
      try {
        let signUpData = {};
        let phone = newData.phone ? newData.phone.replace(/\+/g, ''): newData.phone;

        let phoneValidate = findNumbers(`+${phone}`, 'UA', {
          v2: true
        });

        if (!phoneValidate.length) {
          globalAlertsStore.addAlert({
            title: "Error",
            message: "Invalid phone number"
          });
          return reject();
        }

        let { countryCallingCode, nationalNumber } = phoneValidate[0].number;

        signUpData = {
          ...newData,
          countryCode: `+${countryCallingCode}`,
          phone: nationalNumber,
          role: 'teacher',
        };

        if (oldData) await teachers.update(signUpData._id, signUpData);
        else {
          let response = await AuthApi.signUp(signUpData, auth.token);
          teachers.addTeacher(response.user_info);
        }

        resolve();

      } catch(error) {
        if (error.message) globalAlertsStore.addAlert({
          title: "Error",
          message: error.message
        });
        else if (error.fieldsErrors) globalAlertsStore.addAlert({
          title: "Error",
          message: Object.values(error.fieldsErrors.errors)[0].message
        });
        reject(error);
      }
    })
  }

  function onRowDelete(oldData) {
    return new Promise(async (resolve, reject) => {
      try {
        teachers.delete(oldData._id);
        resolve();
      } catch (error) {
        handleError(error);
        reject(error);
      }
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
        <MaterialTable
          columns={[
            { title: 'Full Name', field: 'fullName' },
            { title: 'Phone', field: 'phone' },
            { title: 'Email', field: 'email' },
          ]}
          title="Teachers"
          data={teachers.teacherList}
          editable={{
            onRowAdd: onRowAddUpdate,
            onRowUpdate: onRowAddUpdate,
            onRowDelete: onRowDelete
          }}
        />
      </div>
    </div>
  )
}

export default inject('teachers', 'auth')(observer(Teachers))
