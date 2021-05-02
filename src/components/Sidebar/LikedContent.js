import PropTypes from "prop-types";
import { imageType } from "../../types";
import { HorizontalGridPresenter } from "../../presenters";
import { modelType } from "../../presenters/ImagePresenter";

/**
 *
 * @param {Object} props - Properties passed to the component
 * @param {Image[]} props.likedImages - Array of images that the user has liked
 * @param {boolean} [props.isDropTarget] - Flag whether the horizontal grid should display the image placeholder as a drop target
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 * @returns HorizontalGridPresenter displaying the images specified
 */
function LikedContent(props) {
    const { likedImages, isDropTarget, model } = props;

    return (
        <HorizontalGridPresenter
            id="likedContent"
            title="Liked content"
            href="/liked"
            images={likedImages}
            model={model}
            small={true}
            emptyStateText={"Click on the heart icon to like an image"}
            isDropTarget={isDropTarget}
        />
    );
}

LikedContent.propTypes = {
    likedImages: PropTypes.arrayOf(imageType),
    isDropTarget: PropTypes.bool,
    model: modelType,
};

export default LikedContent;
