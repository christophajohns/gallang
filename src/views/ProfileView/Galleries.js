import { HorizontalGridPresenter } from "../../presenters";
import { galleryType } from "./ProfileView";
import { modelType as imagePresenterModelType } from "../../presenters/ImagePresenter";
import PropTypes from "prop-types";

/**
 * Section to display the currently logged in user's galleries
 * @param {Object} props - Properties passed to the component
 * @param {Gallery[]} props.galleries - Array holding information about the user's galleries
 * @param {Object} props.model - The model holding the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function Galleries(props) {
    const { galleries, model } = props;

    return (
        <section>
            <div>
                {galleries.map((gallery) => (
                    <HorizontalGridPresenter
                        key={gallery.id}
                        title={gallery.title}
                        href={`/gallery/${gallery.id}`}
                        images={gallery.images}
                        model={model}
                    />
                ))}
            </div>
        </section>
    );
}

Galleries.propTypes = {
    galleries: PropTypes.arrayOf(galleryType).isRequired,
    model: imagePresenterModelType.isRequired,
};

export default Galleries;
