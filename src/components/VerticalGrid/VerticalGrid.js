import PropTypes from "prop-types";
import { imageType } from "../../types";

/**
 * Vertical (scrollable) grid of images to showcase objects in a the results view
 * @param {Object} props - Properties to be passed to the component
 * @param {Image[]} props.images - Array of images to render in the grid
 */
function VerticalGrid(props) {
    const { images } = props;

    return <div>Here should be a vertical grid.</div>;
}

VerticalGrid.propTypes = {
    images: PropTypes.arrayOf(imageType),
};

export default VerticalGrid;
