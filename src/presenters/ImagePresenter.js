import React from "react";
import { useHistory } from "react-router-dom";
import { Image } from "../components";
import { useModelProperty } from "./customHooks";
import PropTypes from "prop-types";

/**
 * Presenter for the Image component
 * @param {Object} props
 * @param {string} props.id - Unique identifier of the object and thereby image
 * @param {string} props.src - Image url for the object image
 * @param {GallangModel} props.model - The model holding the application state
 * @returns Image component
 */
function ImagePresenter(props) {
    const {
        id, // Unique identifier of the object and thereby image
        src, // Image url for the object image
        model, // The model holding the application state
    } = props;

    const browserHistory = useHistory(); // used to manually navigate/redirect to the details of a specific image

    const likedImageIDs = useModelProperty(model, "likedImageIDs");

    /**
     * Function to redirect the user to the details view for the clicked image
     * @param {string} imageID - Identifier of the image for which to display the details
     */
    function redirectToDetailsForImage(imageID) {
        browserHistory.push(`/details/${imageID}`);
    }

    return (
        <Image
            onClickImage={(e) => redirectToDetailsForImage(id)}
            onClickLikeButton={(e) => model.likeImage(id)}
            onClickUnlikeButton={(e) => model.unlikeImage(id)}
            id={id}
            src={src}
            liked={likedImageIDs.includes(id)}
        />
    );
}

ImagePresenter.propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string,
    model: PropTypes.shape({
        likeImage: PropTypes.func.isRequired,
        unlikeImage: PropTypes.func.isRequired,
    }),
};

export default ImagePresenter;
