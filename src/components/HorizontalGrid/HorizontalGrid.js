import { ImagePresenter } from "../../presenters";
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
import { imageType, refType } from "../../types";
import { IconButton } from "../../components";
import {
    modelType as imagePresenterModelType,
    // eslint-disable-next-line no-unused-vars
    ImagePresenterModelType,
} from "../../presenters/ImagePresenter";

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
 * @param {boolean} [props.small] - Flag whether to render smaller versions of the images
 * @param {"collection" | "gallery"} [props.type] - Type of content that is displayed in the grid (e.g. Gallery)
 * @param {string} [props.emptyStateText = "No images yet"] - Text to display if no images are supplied
 * @param {Function} props.onDragOverImagePlaceholder - Function to be called when a user drags an image over the image placeholder
 * @param {Function} props.onDropImagePlaceholder - Function to be called when a user drops a dragged image onto the image placeholder
 * @param {boolean} [props.isDropTarget = false] - Flag whether the horizontal grid should display the image placeholder as a drop target
 * @param {ImagePresenterModelType} props.model - The model holding the application state
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
        small, // Flag whether to render smaller versions of the images
        type, // Type of content that is displayed in the grid (e.g. Gallery)
        emptyStateText = "No images yet", // Text to display if no images are supplied
        onDragOverImagePlaceholder, // Function to be called when a user drags an image over the image placeholder
        onDropImagePlaceholder, // Function to be called when a user drops a dragged image onto the image placeholder
        isDropTarget = false, // Flag whether the horizontal grid should display the image placeholder as a drop target
        model, // The model holding the application state
    } = props;

    return (
        <StyledHorizontalGrid label={title} small={small}>
            <StyledGridTop>
                <StyledTitleAndDescription>
                    {type && <StyledLabel>{type.toUpperCase()}</StyledLabel>}
                    <StyledTitle to={href || "#"}>{title}</StyledTitle>
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
            <StyledGridSection>
                {!isDropTarget ? (
                    <StyledImages ref={imagesRef}>
                        {images.map((image) => (
                            <ImagePresenter
                                key={image.id}
                                id={image.id}
                                src={image.url}
                                small={small}
                                model={model}
                            />
                        ))}
                    </StyledImages>
                ) : (
                    <ImagePlaceholderDiv
                        small={small}
                        onDrop={onDropImagePlaceholder}
                        onDragOver={onDragOverImagePlaceholder}
                    >
                        {emptyStateText}
                    </ImagePlaceholderDiv>
                )}
            </StyledGridSection>
        </StyledHorizontalGrid>
    );
}

HorizontalGrid.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(imageType).isRequired,
    imagesRef: refType.isRequired,
    onClickPreviousButton: PropTypes.func.isRequired,
    onClickNextButton: PropTypes.func.isRequired,
    small: PropTypes.bool,
    type: PropTypes.string,
    emptyStateText: PropTypes.string,
    onDragOverImagePlaceholder: PropTypes.func.isRequired,
    onDropImagePlaceholder: PropTypes.func.isRequired,
    isDropTarget: PropTypes.bool,
    model: imagePresenterModelType.isRequired,
};

export default HorizontalGrid;
