import React from "react";
import PropTypes from "prop-types";
import { persistModel } from "../model";
import { useModelProperty } from "./customHooks";
import { GallangModel } from "../model"; // only imported for JSDoc type

/**
 * Presenter for the all app content a user has to be logged in to access
 * @param {Object} props - Properties passed to the presenter
 * @param {GallangModel} props.model - Model keeping the application state
 */
function LoggedInAreaPresenter(props) {
    const { model, children } = props;

    const currentUser = useModelProperty(model, "currentUser");

    // persist model on every update of current user in model
    React.useEffect(() => {
        if (currentUser) {
            persistModel(model);
        }
    }, [currentUser, model]);

    return <>{children}</>;
}

LoggedInAreaPresenter.propTypes = {
    model: PropTypes.instanceOf(GallangModel).isRequired,
};

export default LoggedInAreaPresenter;
