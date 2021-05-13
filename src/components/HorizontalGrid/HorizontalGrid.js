import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import {
    StyledHorizontalGrid,
    StyledTitleAndDescription,
    StyledTitle,
    StyledDescription,
    StyledPreviousNextChevrons,
    StyledImages,
    StyledGridSection,
    StyledGridTop,
    StyledLabel,
    ImagePlaceholderDiv,
} from "./style";
import { refType } from "../../types";
import { IconButton } from "../../components";

/**
 * Horizontal (scrollable) grid of images to showcase objects in a collection or gallery
 * @param {Object} props - Properties passed to component
 * @param {string} props.title - Title or name for the images displayed in the grid
 * @param {string} props.href - (optional) URL to link to on click on the title
 * @param {string} props.description - (optional) Further description for the grid
 * @param {Function]} props.images - Components to render the images in a horizontal grid
 * @param {React.MutableRefObject} props.gridRef - Reference to be used on the scrollable HTML element displaying the images
 * @param {Function} props.onClickPreviousButton - Function to be called when the previous button (chevron left) is clicked
 * @param {Function} props.onClickNextButton - Function to be called when the next button (chevron right) is clicked
 * @param {boolean} [props.small] - Flag whether to render smaller versions of the images
 * @param {"collection" | "gallery"} [props.type] - Type of content that is displayed in the grid (e.g. Gallery)
 * @param {string} [props.emptyStateText = "No images yet"] - Text to display if no images are supplied
 * @param {Function} props.onDragOverImagePlaceholder - Function to be called when a user drags an image over the image placeholder
 * @param {Function} props.onDropImagePlaceholder - Function to be called when a user drops a dragged image onto the image placeholder
 * @param {boolean} [props.isDropTarget = false] - Flag whether the horizontal grid should display the image placeholder as a drop target
 */
function HorizontalGrid(props) {
    const {
        title, // Specify the title to placed on top of the image grid
        href, // (optional) URL to link to when clicking the title
        description, // (optional) Short (preferably less than 60 characters) description for the images in the grid
        images, // Components to render the images in a horizontal grid
        gridRef, // Reference to be used on the scrollable HTML element displaying the images
        onClickPreviousButton, // Function to be called when the previous button (chevron left) is clicked
        onClickNextButton, // Function to be called when the next button (chevron right) is clicked
        small, // Flag whether to render smaller versions of the images
        type, // Type of content that is displayed in the grid (e.g. Gallery)
        emptyStateText = "No images yet", // Text to display if no images are supplied
        onDragOverImagePlaceholder, // Function to be called when a user drags an image over the image placeholder
        onDropImagePlaceholder, // Function to be called when a user drops a dragged image onto the image placeholder
        isDropTarget = false, // Flag whether the horizontal grid should display the image placeholder as a drop target
    } = props;

    return (
        <StyledHorizontalGrid label={title} small={small}>
            <StyledGridTop>
                <StyledTitleAndDescription>
                    {type && <StyledLabel>{type.toUpperCase()}</StyledLabel>}
                    <StyledTitle to={href || "#"}>
                        {toTitleCase(title)}
                    </StyledTitle>
                    {description ? (
                        <StyledDescription>{description}</StyledDescription>
                    ) : (
                        ""
                    )}
                </StyledTitleAndDescription>
                <StyledPreviousNextChevrons>
                    <IconButton onClick={onClickPreviousButton}>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton onClick={onClickNextButton}>
                        <ChevronRight />
                    </IconButton>
                </StyledPreviousNextChevrons>
            </StyledGridTop>
            <StyledGridSection ref={gridRef}>
                <StyledImages>
                    {isDropTarget && (
                        <ImagePlaceholderDiv
                            small={small}
                            onDrop={onDropImagePlaceholder}
                            onDragOver={onDragOverImagePlaceholder}
                        >
                            {emptyStateText}
                        </ImagePlaceholderDiv>
                    )}
                    {images}
                </StyledImages>
            </StyledGridSection>
        </StyledHorizontalGrid>
    );
}

// -- UTILITY FUNCTIONS --
/**
 * Utility function to transform any string to its title case version (see https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript)
 * @param {string} str - String to transform
 * @returns Title case version of the input string
 */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

HorizontalGrid.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.node.isRequired,
    gridRef: refType.isRequired,
    onClickPreviousButton: PropTypes.func.isRequired,
    onClickNextButton: PropTypes.func.isRequired,
    small: PropTypes.bool,
    type: PropTypes.string,
    emptyStateText: PropTypes.string,
    onDragOverImagePlaceholder: PropTypes.func.isRequired,
    onDropImagePlaceholder: PropTypes.func.isRequired,
    isDropTarget: PropTypes.bool,
};

export default HorizontalGrid;
