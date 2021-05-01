import React from "react";
import PropTypes from "prop-types";
import { ResultsView } from "../views";
import { imageType } from "../types";
import ImagePresenter, {
    modelType as imagePresenterModelType,
} from "./ImagePresenter";

/**
 * Presenter for the Results view
 * @param {Object} props - Properties to be passed to the view
 * @param {string} [props.contentType] - Type of results to display
 * @param {string} props.title - Title or name for the results
 * @param {number} props.numberOfObjects - Total number of objects to be displayed
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {boolean} [props.allowDownloadAll=true] - Flag whether to have a "Download all" button on the page (default: true)
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 * @returns Results view
 */
function ResultsPresenter(props) {
    const {
        contentType,
        title,
        numberOfObjects,
        images,
        allowDownloadAll = true,
        model,
    } = props;

    const [numberOfVisibleObjects, setNumberOfVisibleObjects] = React.useState(
        12
    ); // start with 12 visible images on first load

    /** Placeholder for the download all function */
    function downloadAllImagesAsZipFile() {
        const imageURLs = images.map((image) => image.url);
        console.log({ message: "download all requested", imageURLs });
    }

    return (
        <ResultsView
            contentType={contentType}
            title={title}
            numberOfObjects={numberOfObjects}
            images={images?.slice(0, numberOfVisibleObjects).map((image) => (
                <ImagePresenter
                    key={image.id}
                    id={image.id}
                    src={image.url}
                    model={model}
                />
            ))}
            allowDownloadAll={allowDownloadAll}
            onClickDownloadAll={(e) => downloadAllImagesAsZipFile()}
            onClickLoadMore={(e) =>
                setNumberOfVisibleObjects(numberOfVisibleObjects + 12)
            }
            numberOfVisibleObjects={numberOfVisibleObjects}
            model={model}
        />
    );
}

ResultsPresenter.propTypes = {
    contentType: PropTypes.string,
    title: PropTypes.string.isRequired,
    numberOfObjects: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    allowDownloadAll: PropTypes.bool,
    model: imagePresenterModelType.isRequired,
};

export default ResultsPresenter;
