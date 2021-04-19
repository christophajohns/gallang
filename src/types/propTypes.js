import PropTypes from "prop-types";

export const imageType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
});
