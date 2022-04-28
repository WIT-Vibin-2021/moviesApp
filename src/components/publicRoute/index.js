import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from "../../contexts/authContext";


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const authcontext = useContext(AuthContext)
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            authcontext.isAuthenticated && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;