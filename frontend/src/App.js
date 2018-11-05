import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistor, store } from './store';
import PrivateRoute from './routes';
import Game from './components/Game';
import NotFound from './components/NoMatch';
import Login from './components/Login';
import Signup from './components/Signup';
import History from './components/History';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div>
              <Switch>
                <PrivateRoute exact path="/" component={Game} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/history" component={History} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
