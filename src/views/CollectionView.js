import PropTypes from "prop-types";
import { ResultsView } from "../views";
import { imageType } from "../types";
import { modelType as imagePresenterModelType } from "../presenters/ImagePresenter";

/**
 * View component for the Results (e.g. search results, collection, liked content, gallery) page content.
 * @param {string} props.title - Title or name for the results
 * @param {number} props.numberOfObjects - Total number of objects to be displayed
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function CollectionView(props) {
    const { title, numberOfObjects, images, model } = props;
    return (
        <ResultsView
            contentType="collection"
            title={title}
            numberOfObjects={numberOfObjects}
            images={images}
            model={model}
        />
    );
}

CollectionView.propTypes = {
    title: PropTypes.string.isRequired,
    numberOfObjects: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    model: imagePresenterModelType.isRequired,
};

export default CollectionView;
