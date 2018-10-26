import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './routers/PrivateRoute';
import LoginForm from './auth/LoginForm';
import Game from './Game';
import SignupForm from './auth/SignupForm';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistor, store } from './store';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="container">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={Game} />
                                <Route path="/login" component={LoginForm} />
                                <Route path="/signup" component={SignupForm} />
                            </div>
                        </Router>
                </div>
            </PersistGate>
            </Provider>
        );
    }
}

export default App;
