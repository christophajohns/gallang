import React from "react";
import { useHistory } from "react-router-dom";
import { Image, promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { useModelProperty, usePromise } from "./customHooks";
import PropTypes from "prop-types";

/**
 * Presenter for the Image component
 * @param {Object} props
 * @param {string} props.id - Unique identifier of the object and thereby image
 * @param {string} [props.src] - Image url for the object image
 * @param {ImagePresenterModelType} props.model - The model holding the application state
 * @param {boolean} [props.small] - Flag whether to render smaller versions of the images
 * @returns Image component
 */
function ImagePresenter(props) {
    const {
        id, // Unique identifier of the object and thereby image
        src, // Image url for the object image
        small, // Flag whether to render smaller versions of the images
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
        if (!src) setObjectInfoPromise(CooperHewittSource.getObjectInfo(id)); // fetch image info (incl. url) if src prop is not specified
    }, [src, id]);

    const browserHistory = useHistory(); // used to manually navigate/redirect to the details of a specific image

    const likedImageIDs = useModelProperty(model, "likedImageIDs");

    /**
     * Function to redirect the user to the details view for the clicked image
     * @param {string} imageID - Identifier of the image for which to display the details
     */
    function redirectToDetailsForImage(imageID) {
        browserHistory.push(`/details/${imageID}`);
    }

    /** Properties to pass to the Image component that is rendered by the presenter */
    const imageProps = {
        onClickImage: (e) => redirectToDetailsForImage(id),
        onClickLikeButton: (e) => model.likeImage(id),
        onClickUnlikeButton: (e) => model.unlikeImage(id),
        id,
        liked: likedImageIDs.includes(id),
        small,
    };

    if (!src) {
        return (
            promiseNoData(
                objectInfoPromise,
                objectInfoData,
                objectInfoError
            ) || <Image {...imageProps} src={objectInfoData.images[0].b.url} />
        );
    }

    return <Image {...imageProps} src={src} />;
}

export const modelType = PropTypes.shape({
    likeImage: PropTypes.func.isRequired,
    unlikeImage: PropTypes.func.isRequired,
    likedImageIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
});

/**
 * @typedef ImagePresenterModelType
 * @property {Function} likeImage - Function to like an image by its ID
 * @property {Function} unlikeImage - Function to unlike an image by its ID
 * @property {string[]} likedImageIDs - Array of image IDs the user has liked already
 */
ImagePresenter.propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string,
    small: PropTypes.bool,
    model: modelType.isRequired,
};

export default ImagePresenter;
