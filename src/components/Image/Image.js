import {
    Download,
    GripVertical,
    Heart,
    HeartFill,
    X,
} from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
    StyledGripButton,
    StyledImage,
    StyledIconButton,
    StyledImageButtons,
    StyledTopRightButton,
} from "./style";
import AddImageToGalleryModal from "./AddImageToGalleryModal";
import { galleryType } from "../../types";

/**
 * Single object (image) showcase including like and download buttons
 * @param {Object} props
 * @param {string} props.id - Unique identifier of the object and thereby image
 * @param {string} props.src - Image url for the object image
 * @param {boolean} props.liked - Flag whether the user has liked this image
 * @param {Function} props.onClickLikeButton - Function to be called when a user clicks the heart (like) button
 * @param {Function} props.onClickUnlikeButton - Function to be called when a user clicks the filled heart (unlike) button
 * @param {Function} props.onClickImage - Function to be called when a user clicks on the image
 * @param {Function} props.onDragStartImage - Function to be called when a user starts dragging an image
 * @param {Function} props.onDragStopImage - Function to be called when a user stops dragging an image
 * @param {boolean} props.isRemovable - Flag whether to render a remove button in the top right corner
 * @param {Function} props.onClickRemoveButton - Function to be called when a user clicks the button to remove an image
 * @param {boolean} props.showModal - Flag whether the modal to add the image to a gallery should be displayed
 * @param {Function} props.onRequestCloseModal - Function to be called when a user requests to close the modal
 * @param {Function} props.onRequestAddToGallery - Function to be called when a user requests to add the image to a specified gallery
 * @param {Gallery[]} props.galleries - The user's galleries to show as selectables
 * @param {Function} props.onOptionChange - Function to be called when the user selects an option in the modal
 * @param {Function} props.modalValid - Boolean specifying if the selected option in the modal is a valid option
 */
function Image(props) {
    const {
        id, // Specify the title to placed on top of the image grid
        src, // Array of image data to be rendered in a horizontal grid
        liked, // Boolean specifying whether the current user has already liked that image
        onClickLikeButton, // Function to be called when a user clicks the heart (like) button
        onClickUnlikeButton, // Function to be called when a user clicks the filled heart (unlike) button
        onClickImage, // Function to be called when a user clicks on the image
        onDragStartImage, // Function to be called when a user starts dragging an image
        onDragEndImage, // Function to be called when a user stops dragging an image
        small = false, // Flag whether to render smaller versions of the images
        isRemovable, // Flag whether to render a remove button in the top right corner
        onClickRemoveButton, // Function to be called when a user clicks the button to remove an image
        showModal, // Flag whether the modal to add the image to a gallery should be displayed
        onRequestCloseModal, // Function to be called when a user requests to close the modal
        onRequestAddToGallery, // Function to be called when a user requests to add the image to a specified gallery
        galleries, // The user's galleries to show as selectables
        onModalOptionChange, // Function to be called when the user selects an option in the modal
        modalValid, // Boolean specifying if the selected option in the modal is a valid option 
    } = props;

    return (
        <>
            <StyledImage
                small={small}
                draggable="true"
                onDragStart={onDragStartImage}
            >
                <img id={id} src={src} alt={id} onClick={onClickImage} />
                {isRemovable ? (
                    <StyledTopRightButton
                        variant="link"
                        draggable="true"
                        onClick={onClickRemoveButton}
                    >
                        <X />
                    </StyledTopRightButton>
                ) : (
                    <StyledGripButton
                        variant="link"
                        draggable="true"
                        onDragStart={onDragStartImage}
                        onDragEnd={onDragEndImage}
                    >
                        <GripVertical />
                    </StyledGripButton>
                )}
                <StyledImageButtons>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip
                                id={liked ? "tooltip-like" : "tooltip-unlike"}
                            >
                                {liked ? "Unlike" : "Like"}
                            </Tooltip>
                        }
                    >
                        <StyledIconButton
                            variant="link"
                            onClick={
                                liked ? onClickUnlikeButton : onClickLikeButton
                            }
                        >
                            {liked ? <HeartFill /> : <Heart />}
                        </StyledIconButton>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip id="tooltip-download">Download</Tooltip>
                        }
                    >
                        <StyledIconButton
                            variant="link"
                            download={true}
                            href={src}
                            target="_blank"
                        >
                            <Download />
                        </StyledIconButton>
                    </OverlayTrigger>
                </StyledImageButtons>
            </StyledImage>

            <AddImageToGalleryModal
                showModal={showModal}
                onRequestCloseModal={onRequestCloseModal}
                onRequestAddToGallery={onRequestAddToGallery}
                galleries={galleries}
                onOptionChange={onModalOptionChange}
                modalValid={modalValid}
            />
        </>
    );
}

Image.propTypes = {
    /** Unique identifier of the object and thereby image */
    id: PropTypes.string.isRequired,
    /** Image url for the object image */
    src: PropTypes.string.isRequired,
    /** Flag whether the user has liked this image */
    liked: PropTypes.bool.isRequired,
    /** Function to be called when a user clicks the heart (like) button */
    onClickLikeButton: PropTypes.func.isRequired,
    /** Function to be called when a user clicks the filled heart (unlike) button */
    onClickUnlikeButton: PropTypes.func.isRequired,
    /** Function to be called when a user clicks on the image */
    onClickImage: PropTypes.func.isRequired,
    /** Function to be called when a user starts dragging an image */
    onDragStartImage: PropTypes.func.isRequired,
    /** Function to be called when a user stops dragging an image */
    onDragEndImage: PropTypes.func.isRequired,
    /** Flag whether to render a remove button in the top right corner */
    isRemovable: PropTypes.bool,
    /** Function to be called when a user clicks the button to remove an image */
    onClickRemoveButton: PropTypes.func,
    /** Flag whether the modal to add the image to a gallery should be displayed */
    showModal: PropTypes.bool,
    /** Function to be called when a user requests to close the modal */
    onRequestCloseModal: PropTypes.func,
    /** Function to be called when a user requests to add the image to a specified gallery */
    onRequestAddToGallery: PropTypes.func,
    /** The user's galleries to show as selectables */
    galleries: PropTypes.arrayOf(galleryType),
    /** Function to be called when the user selects an option in the modal */
    onOptionChange: PropTypes.func,
    /** Boolean specifying if the selected option in the modal is a valid option  */
    modalValid: PropTypes.bool,
};

export default Image;
