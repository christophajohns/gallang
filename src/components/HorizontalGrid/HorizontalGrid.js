import { Image } from "../../components";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import {
    StyledHorizontalGrid,
    StyledTitleAndDescription,
    StyledTitle,
    StyledDescription,
    StyledPreviousNextChevrons,
    StyledIconButton,
    StyledImages,
} from "./style";

/**
 * Horizontal (scrollable) grid of images to showcase objects in a collection or gallery
 * @param {Object} props - Properties passed to component
 * @param {string} props.title - Title or name for the images displayed in the grid
 * @param {string} props.href - (optional) URL to link to on click on the title
 * @param {string} props.description - (optional) Further description for the grid
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {React.MutableRefObject} props.imagesRef - Reference to be used on the scrollable HTML element displaying the images
 * @param {Function} props.onClickPreviousButton - Function to be called when the previous button (chevron left) is clicked
 * @param {Function} props.onClickNextButton - Function to be called when the next button (chevron right) is clicked
 * @returns
 */
function HorizontalGrid(props) {
    const {
        title, // Specify the title to placed on top of the image grid
        href, // (optional) URL to link to when clicking the title
        description, // (optional) Short (preferably less than 60 characters) description for the images in the grid
        images, // Array of image data to be rendered in a horizontal grid
        imagesRef, // Reference to be used on the scrollable HTML element displaying the images
        onClickPreviousButton, // Function to be called when the previous button (chevron left) is clicked
        onClickNextButton, // Function to be called when the next button (chevron right) is clicked
    } = props;

    return (
        <StyledHorizontalGrid label={title}>
            <div>
                <StyledTitleAndDescription>
                    <StyledTitle href={href ? href : "#"}>{title}</StyledTitle>
                    {description ? (
                        <StyledDescription>{description}</StyledDescription>
                    ) : (
                        ""
                    )}
                </StyledTitleAndDescription>
                <StyledPreviousNextChevrons>
                    <StyledIconButton
                        variant="link"
                        onClick={onClickPreviousButton}
                    >
                        <ChevronLeft />
                    </StyledIconButton>
                    <StyledIconButton
                        variant="link"
                        onClick={onClickNextButton}
                    >
                        <ChevronRight />
                    </StyledIconButton>
                </StyledPreviousNextChevrons>
            </div>
            <StyledImages ref={imagesRef}>
                {images.map((image) => (
                    <Image
                        key={image.id}
                        id={image.id}
                        src={image.url}
                        liked={image.liked}
                    />
                ))}
            </StyledImages>
        </StyledHorizontalGrid>
    );
}

HorizontalGrid.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            liked: PropTypes.bool.isRequired,
        })
    ).isRequired,
    imagesRef: PropTypes.oneOfType([
        // Either a function
        PropTypes.func,
        // Or the instance of a DOM native element (see the note about SSR)
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
    onClickPreviousButton: PropTypes.func.isRequired,
    onClickNextButton: PropTypes.func.isRequired,
};

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 * @property {string} url - Image url for the object
 * @property {bool} liked - Flag whether the user has liked this image
 */

export default HorizontalGrid;