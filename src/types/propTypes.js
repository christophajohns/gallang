import PropTypes from "prop-types";

export const imageType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
});

export const galleryType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
});

export const refType = PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
]);
