import PropTypes from "prop-types";
import { ResultsView } from "../views";
import { imageType } from "../types";
import { modelType as imagePresenterModelType } from "../presenters/ImagePresenter";

/**
 * View component for the Results (e.g. search results, collection, liked content, gallery) page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {string} props.searchQuery - Search query string the user has searched for
 * @param {number} props.numberOfResults - Total number of results returned
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function SearchResultsView(props) {
    const { searchQuery, numberOfResults, images, model } = props;
    return (
        <ResultsView
            contentType="search results"
            title={`"${searchQuery}"`}
            numberOfObjects={numberOfResults}
            images={images}
            model={model}
        />
    );
}

SearchResultsView.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    numberOfResults: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    model: imagePresenterModelType.isRequired,
};

export default SearchResultsView;
