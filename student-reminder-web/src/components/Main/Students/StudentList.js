import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { findNumbers } from 'libphonenumber-js';
import { globalAlertsStore } from '../../../stores/GlobalAlertsStore';
import AuthApi from '../../../api/auth';
import Link from '@material-ui/core/Link';
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  tableWrapper: {
    marginTop: '2rem',
    maxWidth: "100%"
  }
}));

function StudentList({ goBack, students, groupId }) {
  const classes = useStyles();

  useEffect(() => {
    students.getStudentsByGroupId(groupId);

    return () => {
      students.setToInitState();
    }
  }, [students, groupId])

  function onRowAdd(newData) {
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
          role: 'student',
          group: groupId
        };

        let response = await AuthApi.signUp(signUpData);

        students.addStudent(response.user_info);

        resolve();

      } catch(error) {
        if (error.message) globalAlertsStore.addAlert({
          title: "Error",
          message: error.message
        })
        else if (error.fieldsErrors) globalAlertsStore.addAlert({
          title: "Error",
          message: Object.values(error.fieldsErrors.errors)[0].message
        })
        reject(error);
      }
    })
  }
  
  return (
    <div className={classes.root}>
      <Link component="button" variant="body2" onClick={() => goBack()}>{'< Go back'}</Link>
      <div className={classes.tableWrapper}>
        <MaterialTable
          columns={[
            { title: 'Full Name', field: 'fullName' },
            { title: 'Phone', field: 'phone' },
            { title: 'Email', field: 'email' },
            { title: 'Group Leader', field: 'groupLeader', type: 'boolean', searchable: false },
            { title: 'Active', field: 'verified', type: 'boolean', editable: 'never', searchable: false }
          ]}
          title={students.groupName}
          data={students.studentList}
          editable={{
            onRowAdd: onRowAdd,
            onRowUpdate: (newData, oldData) => console.log(newData),
            onRowDelete: oldData => console.log(oldData)
          }}
        />
      </div>
    </div>
  )
}

export default inject('students')(observer(StudentList))