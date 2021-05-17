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
 * @param {boolean} [props.allowDownloadAll=false] - Flag whether to have a "Download all" button on the page (default: false)
 * @param {boolean} [props.imagesAreRemovable=false] - Flag whether the images presented in the results view should be removable on request
 * @param {boolean} [props.allowDelete=false] - Flag whether to have a "Delete" button on the page (default: false)
 * @param {Function} [props.handleDelete] - Function to be called when a user requests deletion
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
        allowDownloadAll = false,
        imagesAreRemovable = false,
        allowDelete = false,
        handleDelete,
        model,
    } = props;

    const [numberOfVisibleObjects, setNumberOfVisibleObjects] =
        React.useState(12); // start with 12 visible images on first load

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
                    isRemovable={imagesAreRemovable}
                    removeImage={image.removeImage}
                    model={model}
                />
            ))}
            allowDownloadAll={allowDownloadAll}
            onClickDownloadAll={(e) => downloadAllImagesAsZipFile()}
            allowDelete={allowDelete}
            onClickDeleteButton={handleDelete}
            onClickLoadMore={(e) =>
                setNumberOfVisibleObjects(numberOfVisibleObjects + 12)
            }
            numberOfVisibleObjects={numberOfVisibleObjects}
        />
    );
}

ResultsPresenter.propTypes = {
    contentType: PropTypes.string,
    title: PropTypes.string.isRequired,
    numberOfObjects: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    allowDownloadAll: PropTypes.bool,
    imagesAreRemovable: PropTypes.bool,
    allowDelete: PropTypes.bool,
    handleDelete: PropTypes.func,
    model: imagePresenterModelType.isRequired,
};

export default ResultsPresenter;
