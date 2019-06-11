import React from 'react';
import { Route, Router } from 'react-router';
import MainRouter from './routes';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';

/* stores */


const stores = {};
const history = createBrowserHistory();

function App() {
  return (
    <Provider { ...stores }>
      <Router history={history}>
        <div className="App">
          <main>
            <Route component={MainRouter} />
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
