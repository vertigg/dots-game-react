import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './routers/PrivateRoute';
import LoginForm from './auth/LoginForm';
import Game from './Game';
import SignupForm from './auth/SignupForm';

class App extends React.Component {
    render() {
        return (
                <div className="container">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={Game} />
                                <Route path="/login" component={LoginForm} />
                                <Route path="/signup" component={SignupForm} />
                            </div>
                        </Router>
                </div>
        );
    }
}

export default App;
