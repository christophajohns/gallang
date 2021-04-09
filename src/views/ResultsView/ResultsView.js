import PropTypes from "prop-types";
import { VerticalGrid } from "../../components";
import { imageType } from "../../types";
import { modelType as imagePresenterModelType } from "../../presenters/ImagePresenter";
import { TitleAndDescriptionDiv, TitleH3, ContentTypeDiv } from "./style";

/**
 * View component for the Results (e.g. search results, collection, liked content, gallery) page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {"collection" | "gallery" | "liked content"} [props.contentType] - Type of results to display
 * @param {string} props.title - Title or name for the results
 * @param {number} props.numberOfObjects - Total number of objects to be displayed
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function ResultsView(props) {
    const { contentType, title, numberOfObjects, images, model } = props;
    return (
        <main className="ResultsView">
            <TitleAndDescriptionDiv>
                {contentType && contentType !== "liked content" ? (
                    <ContentTypeDiv>{contentType.toUpperCase()}</ContentTypeDiv>
                ) : (
                    ""
                )}
                <TitleH3>{title}</TitleH3>
                <div>{numberOfObjects} Objects</div>
            </TitleAndDescriptionDiv>
            <VerticalGrid images={images} model={model} />
        </main>
    );
}

ResultsView.propTypes = {
    contentType: PropTypes.string,
    title: PropTypes.string.isRequired,
    numberOfObjects: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    model: imagePresenterModelType.isRequired,
};

export default ResultsView;
