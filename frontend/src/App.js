import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistor, store } from './store';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './routes';
import Game from './components/Game';
import NotFound from './components/NoMatch';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div>
              <Switch>
                <PrivateRoute exact path="/" component={Game} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
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
