import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import GroupIcon from '@material-ui/icons/Group';
import SubjectIcon from '@material-ui/icons/Book';
import ScheduleIcon from '@material-ui/icons/Schedule';

export default function LabelBottomNavigation({ history }) {
  const { pathname, search } = history.location;
  const links = ['/', '/subjects', '/schedules', '/lessons'];
  const initValue = links.includes(pathname) ? pathname + search : '/';
  const [value, setValue] = React.useState(initValue);

  if (initValue !== value) setValue(initValue);

  function handleChange(event, newValue) {
    setValue(newValue);
    history.push(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction label="Groups" value="/" icon={<GroupIcon />} />
      <BottomNavigationAction label="Subjects" value={`/subjects${history.location.search}`} icon={<SubjectIcon />} />
      <BottomNavigationAction label="Schedules" value={`/schedules${history.location.search}`} icon={<ScheduleIcon />} />
      <BottomNavigationAction label="Lessons" value="/lessons" icon={<LibraryBooks />} />
    </BottomNavigation>
  );
}