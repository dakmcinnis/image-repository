import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { auth } from './app/firebase';

interface PrivateRouteProps extends RouteProps {
    component: any;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const isLoggedIn = !!auth.currentUser;
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    )
};

export default PrivateRoute;