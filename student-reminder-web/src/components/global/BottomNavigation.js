import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import GroupIcon from '@material-ui/icons/Group';
import SubjectIcon from '@material-ui/icons/Book';
import ScheduleIcon from '@material-ui/icons/Schedule';

export default function LabelBottomNavigation({ history }) {
  const [value, setValue] = React.useState(history.location.pathname);

  function handleChange(event, newValue) {
    setValue(newValue);
    history.push(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction label="Groups" value="/" icon={<GroupIcon />} />
      <BottomNavigationAction label="Subjects" value="/subjects" icon={<SubjectIcon />} />
      <BottomNavigationAction label="Schedules" value="/schedules" icon={<ScheduleIcon />} />
      <BottomNavigationAction label="Lessons" value="/lessons" icon={<LibraryBooks />} />
    </BottomNavigation>
  );
}