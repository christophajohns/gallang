import React from "react";
import { HorizontalGrid } from "../components";
import PropTypes from "prop-types";
import { imageType } from "../types";
import {
    modelType as imagePresenterModelType,
    // eslint-disable-next-line no-unused-vars
    ImagePresenterModelType,
} from "./ImagePresenter";

/**
 * Presenter for the HorizontalGrid component
 * @param {Object} props - Properties passed to component
 * @param {string} props.title - Title or name for the images displayed in the grid
 * @param {string} props.href - (optional) URL to link to on click on the title
 * @param {string} props.description - (optional) Further description for the grid
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {boolean} [props.small = false] - Flag whether to render smaller versions of the images
 * @param {"collection" | "gallery"} [props.type] - Type of content that is displayed in the grid (e.g. Gallery)
 * @param {string} [props.emptyStateText] - Text to display if no images are supplied
 * @param {ImagePresenterModelType} props.model - The model holding the application state
 * @returns HorizontalGrid component
 */
function HorizontalGridPresenter(props) {
    const {
        title, // Specify the title to placed on top of the image grid
        href, // (optional) URL to link to when clicking the title
        description, // (optional) Short (preferably less than 60 characters) description for the images in the grid
        images, // Array of image data to be rendered in a horizontal grid
        small, // Flag whether to render smaller versions of the images
        type, // Type of content that is displayed in the grid (e.g. Gallery)
        emptyStateText, // Text to display if no images are supplied
        model, // The model holding the application state
    } = props;

    const imagesRef = React.useRef(null); // used to enable the automatic scrolling behaviour

    /** Scrolls the HTML element referenced via imagesRef one full width to the left. */
    function scrollLeft() {
        imagesRef.current.scrollLeft -= imagesRef.current.clientWidth;
    }

    /** Scrolls the HTML element referenced via imagesRef one full width to the right. */
    function scrollRight() {
        imagesRef.current.scrollLeft += imagesRef.current.clientWidth;
    }

    return (
        <HorizontalGrid
            imagesRef={imagesRef}
            onClickPreviousButton={scrollLeft}
            onClickNextButton={scrollRight}
            title={title}
            href={href}
            description={description}
            images={images}
            small={small}
            type={type}
            emptyStateText={emptyStateText}
            model={model}
        />
    );
}

HorizontalGridPresenter.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(imageType),
    small: PropTypes.bool,
    emptyStateText: PropTypes.string,
    model: imagePresenterModelType.isRequired,
};

export default HorizontalGridPresenter;
