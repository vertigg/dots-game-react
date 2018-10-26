import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistor, store } from './store';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './routers';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="container">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={GamePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/signup" component={SignupPage} />
                            </div>
                        </Router>
                </div>
            </PersistGate>
            </Provider>
    );
  }
}

export default App;
