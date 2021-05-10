import React from "react";
import { HorizontalGrid } from "../components";
import PropTypes from "prop-types";
import { imageType } from "../types";
import {
    modelType as imagePresenterModelType,
    // eslint-disable-next-line no-unused-vars
    ImagePresenterModelType,
} from "./ImagePresenter";
import { useHistory } from "react-router";

/**
 * Presenter for the HorizontalGrid component
 * @param {Object} props - Properties passed to component
 * @param {string} [props.id] - Unique identifier for the horizontal grid (e.g. the gallery id)
 * @param {string} props.title - Title or name for the images displayed in the grid
 * @param {string} props.href - (optional) URL to link to on click on the title
 * @param {string} props.description - (optional) Further description for the grid
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {boolean} [props.small = false] - Flag whether to render smaller versions of the images
 * @param {"collection" | "gallery"} [props.type] - Type of content that is displayed in the grid (e.g. Gallery)
 * @param {string} [props.emptyStateText] - Text to display if no images are supplied
 * @param {ImagePresenterModelType} props.model - The model holding the application state
 * @param {Function} props.model.addImageToGallery - Function to add the specified image to the specified gallery
 * @param {boolean} [props.isDropTarget] - Flag whether the horizontal grid should display the image placeholder as a drop target
 * @param {Function} [props.onDrop] - Function to be called when an image gets dropped onto the image placeholder
 * @returns HorizontalGrid component
 */
function HorizontalGridPresenter(props) {
    const {
        id, // Unique identifier for the horizontal grid (e.g. the gallery id)
        title, // Specify the title to placed on top of the image grid
        href, // (optional) URL to link to when clicking the title
        description, // (optional) Short (preferably less than 60 characters) description for the images in the grid
        images, // Array of image data to be rendered in a horizontal grid
        small, // Flag whether to render smaller versions of the images
        type, // Type of content that is displayed in the grid (e.g. Gallery)
        emptyStateText, // Text to display if no images are supplied
        isDropTarget, // Flag whether the horizontal grid should display the image placeholder as a drop target
        onDrop, // Function to be called when an image gets dropped onto the image placeholder
        model, // The model holding the application state
    } = props;

    const gridRef = React.useRef(null); // used to enable the automatic scrolling behaviour

    const browserHistory = useHistory();

    /** Scrolls the HTML element referenced via gridRef one full width to the left. */
    function scrollLeft() {
        gridRef.current.scrollLeft -= gridRef.current.clientWidth;
    }

    /** Scrolls the HTML element referenced via gridRef one full width to the right. */
    function scrollRight() {
        gridRef.current.scrollLeft += gridRef.current.clientWidth;
    }

    /**
     * Sets the data transfer drop effect to copy (plus icon in UI)
     * @param {Event} event
     */
    function showDropEffectCopy(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    }

    /**
     * Adds the dragged image ID to liked content or the specified gallery
     * @param {Event} event
     */
    function addImageToLikedOrGallery(event) {
        event.preventDefault();
        const imageID = event.dataTransfer.getData("text/plain");
        if (!id) return;
        onDrop();
        if (id === "likedContent") return model.likeImage(imageID);
        if (id === "newGallery") return browserHistory.push("/new-gallery");
        model.addImageToGallery(imageID, id);
        model.isCurrentlyDragging = false;
    }

    return (
        <HorizontalGrid
            gridRef={gridRef}
            onClickPreviousButton={scrollLeft}
            onClickNextButton={scrollRight}
            title={title}
            href={href}
            description={description}
            images={images}
            small={small}
            type={type}
            emptyStateText={emptyStateText}
            onDragOverImagePlaceholder={(e) => showDropEffectCopy(e)}
            onDropImagePlaceholder={(e) => addImageToLikedOrGallery(e)}
            isDropTarget={!images.length || isDropTarget}
            model={model}
        />
    );
}

const modelType = PropTypes.shape({
    ...imagePresenterModelType.isRequired,
    addImageToGallery: PropTypes.func.isRequired,
});

HorizontalGridPresenter.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(imageType),
    small: PropTypes.bool,
    emptyStateText: PropTypes.string,
    isDropTarget: PropTypes.bool,
    onDrop: PropTypes.func,
    model: modelType.isRequired,
};

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 * @property {string} [url] - Image url for the object
 */

export default HorizontalGridPresenter;
