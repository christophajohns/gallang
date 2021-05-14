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
    } = props;

    return (
        <StyledImage
            small={small}
            draggable="true"
            onDragStart={onDragStartImage}
            onDragEnd={onDragEndImage}
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
                        <Tooltip id={liked ? "tooltip-like" : "tooltip-unlike"}>
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
                    overlay={<Tooltip id="tooltip-download">Download</Tooltip>}
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
};

export default Image;
