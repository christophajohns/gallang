import PropTypes from "prop-types";
import { imageType } from "../../types";
import { ImagePresenter } from "../../presenters";
import { modelType as imagePresenterModelType } from "../../presenters/ImagePresenter";
import { VerticalGridDiv } from "./style";

/**
 * Vertical (scrollable) grid of images to showcase objects in a the results view
 * @param {Object} props - Properties to be passed to the component
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {Object} props.model - The model holding the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function VerticalGrid(props) {
    const { images, model } = props;

    return (
        <VerticalGridDiv>
            {images.map((image) => (
                <ImagePresenter
                    key={image.id}
                    id={image.id}
                    src={image.url}
                    model={model}
                />
            ))}
        </VerticalGridDiv>
    );
}

VerticalGrid.propTypes = {
    images: PropTypes.arrayOf(imageType),
    model: imagePresenterModelType.isRequired,
};

export default VerticalGrid;
