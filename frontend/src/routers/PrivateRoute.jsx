import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn } from '../auth/AuthService';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        loggedIn()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)