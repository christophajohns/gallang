import React from "react";
import { HorizontalGrid } from "../components";
import PropTypes from "prop-types";

/**
 * Presenter for the HorizontalGrid component
 * @param {Object} props - Properties passed to component
 * @param {string} props.title - Title or name for the images displayed in the grid
 * @param {string} props.href - (optional) URL to link to on click on the title
 * @param {string} props.description - (optional) Further description for the grid
 * @param {Image[]} props.images - Array of images to render in the grid
 * @returns HorizontalGrid component
 */
function HorizontalGridPresenter(props) {
    const {
        title, // Specify the title to placed on top of the image grid
        href, // (optional) URL to link to when clicking the title
        description, // (optional) Short (preferably less than 60 characters) description for the images in the grid
        images, // Array of image data to be rendered in a horizontal grid
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
        />
    );
}

HorizontalGridPresenter.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            liked: PropTypes.bool.isRequired,
        })
    ),
};

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 * @property {string} url - Image url for the object
 * @property {bool} liked - Flag whether the user has liked this image
 */

export default HorizontalGridPresenter;
