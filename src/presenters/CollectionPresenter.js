import PropTypes from "prop-types";
import { ResultsPresenter } from "../presenters";
import { imageType } from "../types";
import { modelType as imagePresenterModelType } from "./ImagePresenter";

/**
 * Presenter for the collection page content.
 * @param {string} props.title - Title or name for the collection
 * @param {number} props.numberOfObjects - Total number of objects in the collection to be displayed
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function CollectionPresenter(props) {
    const { title, numberOfObjects, images, model } = props;
    return (
        <ResultsPresenter
            contentType="collection"
            title={title}
            numberOfObjects={numberOfObjects}
            images={images}
            model={model}
        />
    );
}

CollectionPresenter.propTypes = {
    title: PropTypes.string.isRequired,
    numberOfObjects: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    model: imagePresenterModelType.isRequired,
};

export default CollectionPresenter;
