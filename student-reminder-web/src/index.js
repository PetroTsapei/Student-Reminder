import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {RouterStore, syncHistoryWithStore} from "mobx-react-router";
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { authStore } from './stores/AuthStore';
import { globalAlertsStore } from './stores/GlobalAlertsStore';
import { groupStore } from './stores/GroupStore';
import { errorStore } from './stores/ErrorStore';
import { studentStore } from './stores/StudentStore';
import { subjectStore } from './stores/SubjectStore';
import { scheduleStore } from './stores/ScheduleStore';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routingStore);

/* stores */
const stores = {
  routing: routingStore,
  auth: authStore,
  alerts: globalAlertsStore,
  groups: groupStore,
  errors: errorStore,
  students: studentStore,
  subjects: subjectStore,
  schedules: scheduleStore
};

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
