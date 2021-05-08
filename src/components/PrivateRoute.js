import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationService } from "../model";

/**
 * Component to only route to specified component if the user is currently logged in
 * @param {Object} props
 * @param {Function} props.children - Nodes passed as children to the component
 * @returns Passed component or redirect to login page
 */
function PrivateRoute(props) {
    const {
        children,
        ...rest // other props passed to the route
    } = props;

    return (
        <Route {...rest}>
            {AuthenticationService.currentUser ? (
                children
            ) : (
                <Redirect to="/login" />
            )}
        </Route>
    );
}

export default PrivateRoute;
