import React from "react";
import PropTypes from "prop-types";
import { ImagePresenter } from "../presenters";
import CooperHewittSource from "../model";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";

/**
 * Presenter for a liked image component (using ImagePresenter)
 * @param {Object} props
 * @param {string} props.id - Unique identifier of the object and thereby image
 * @param {Object} props.model - The model holding the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 * @returns Loading spinner or ImagePresenter for the specified image (object) ID
 */
function LikedImagePresenter(props) {
    const {
        id, // Unique identifier of the object and thereby image
        model, // The model holding the application state
    } = props;

    // State
    const [objectInfoPromise, setObjectInfoPromise] = React.useState(null);
    const objectInfoPromiseStatesAndSetters = usePromise(objectInfoPromise);
    const objectInfoData = objectInfoPromiseStatesAndSetters[0];
    const objectInfoError = objectInfoPromiseStatesAndSetters[2];

    // Effects
    React.useEffect(() => {
        // only at creation
        setObjectInfoPromise(CooperHewittSource.getObjectInfo(id));
    }, [id]);

    return (
        promiseNoData(objectInfoPromise, objectInfoData, objectInfoError) || (
            <ImagePresenter
                id={id}
                src={objectInfoData.images[0].b.url}
                model={model}
            />
        )
    );
}

export const modelType = PropTypes.shape({
    likeImage: PropTypes.func.isRequired,
    unlikeImage: PropTypes.func.isRequired,
    likedImageIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
});

LikedImagePresenter.propTypes = {
    id: PropTypes.string.isRequired,
    model: modelType.isRequired,
};

export default LikedImagePresenter;
