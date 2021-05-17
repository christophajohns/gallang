import PropTypes from "prop-types";
import { VerticalGridDiv } from "./style";

/**
 * Vertical (scrollable) grid of images to showcase objects in a the results view
 * @param {Object} props - Properties to be passed to the component
 * @param {Object | Function} props.images - Slot to display images
 */
function VerticalGrid(props) {
    const { images } = props;

    return <VerticalGridDiv>{images}</VerticalGridDiv>;
}

VerticalGrid.propTypes = {
    images: PropTypes.node,
};

export default VerticalGrid;
