import React from "react";
import { Route, Redirect } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { GallangModel } from "../model"; // only imported for JSDoc type

/**
 * Component to only route to specified component if the user is currently logged in
 * @param {Object} props
 * @param {GallangModel} props.model - Model keeping the application state
 * @param {Function} props.children - Nodes passed as children to the component
 * @returns Passed component or redirect to login page
 */
function PrivateRoute(props) {
    const {
        model,
        children,
        ...rest // other props passed to the route
    } = props;

    return (
        <Route {...rest}>
            {model.currentUser ? children : <Redirect to="/login" />}
        </Route>
    );
}

export default PrivateRoute;
