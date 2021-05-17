import React from "react";
import PropTypes from "prop-types";
import { persistModel, GallangModel } from "../model";
import { useModelProperty } from "./customHooks";

/**
 * Presenter for all app content a user has to be logged in to access
 * @param {Object} props - Properties passed to the presenter
 * @param {GallangModel} props.model - Model keeping the application state
 */
function LoggedInAreaPresenter(props) {
    const { model, children } = props;

    const currentUser = useModelProperty(model, "currentUser");

    React.useEffect(() => {
        if (currentUser) persistModel(model);
    }, [currentUser, model]);

    return <>{children}</>;
}

LoggedInAreaPresenter.propTypes = {
    model: PropTypes.instanceOf(GallangModel).isRequired,
};

export default LoggedInAreaPresenter;
