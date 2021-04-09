import PropTypes from "prop-types";
import { ResultsPresenter } from "../presenters";
import { imageType } from "../types";
import { modelType as imagePresenterModelType } from "../presenters/ImagePresenter";

/**
 * View component for the liked content page content.
 * @param {number} props.numberOfObjects - Total number of objects in the gallery to be displayed
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function LikedContentView(props) {
    const { numberOfObjects, images, model } = props;
    return (
        <ResultsPresenter
            title="Liked Content"
            numberOfObjects={numberOfObjects}
            images={images}
            model={model}
        />
    );
}

LikedContentView.propTypes = {
    numberOfObjects: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    model: imagePresenterModelType.isRequired,
};

export default LikedContentView;
