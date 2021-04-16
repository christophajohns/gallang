import PropTypes from "prop-types";

export const imageType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
});

export const galleryType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
});
