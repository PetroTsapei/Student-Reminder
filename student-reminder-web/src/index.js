import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {RouterStore, syncHistoryWithStore} from "mobx-react-router";
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AuthStore } from './stores/AuthStore';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const authStore = new AuthStore();

const history = syncHistoryWithStore(browserHistory, routingStore);

/* stores */
const stores = {
  routing: routingStore,
  auth: authStore
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
