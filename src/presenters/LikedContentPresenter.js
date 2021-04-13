import { ResultsPresenter } from "../presenters";
import { useModelProperty } from "./customHooks";
import { modelType as imagePresenterModelType } from "./ImagePresenter";

/**
 * Presenter for the liked content page content.
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function LikedContentPresenter(props) {
    const { model } = props;

    const likedImageIDs = useModelProperty(model, "likedImageIDs"); // remove this and use model.likedImageIDs directly to avoid immediate re-render

    return (
        <ResultsPresenter
            title="Liked Content"
            numberOfObjects={likedImageIDs.length}
            images={likedImageIDs.map((imageID) => ({ id: imageID }))}
            model={model}
        />
    );
}

LikedContentPresenter.propTypes = {
    model: imagePresenterModelType.isRequired,
};

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 */

export default LikedContentPresenter;
