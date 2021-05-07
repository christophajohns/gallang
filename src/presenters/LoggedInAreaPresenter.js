import React from "react";
import { persistModel } from "../model";
import { useCurrentUser } from "./customHooks";
import { modelType as imagePresenterModelType } from "./ImagePresenter";

/**
 * Presenter for the all app content a user has to be logged in to access
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function LoggedInAreaPresenter(props) {
    const { model, children } = props;

    const currentUser = useCurrentUser();

    React.useEffect(() => {
        if (currentUser.auth && currentUser.auth.uid !== model.currentUserID) {
            model.currentUserID = currentUser.auth.uid;
            model.currentUserName = currentUser.auth.displayName;
            persistModel(model);
        }
    }, [currentUser, model]);

    return <>{children}</>;
}

LoggedInAreaPresenter.propTypes = {
    model: imagePresenterModelType.isRequired,
};

export default LoggedInAreaPresenter;
