import {
    Download,
    GripVertical,
    Heart,
    HeartFill,
} from "react-bootstrap-icons";
import PropTypes from "prop-types";
import {Tooltip, OverlayTrigger} from "react-bootstrap";
import {
    StyledGripButton,
    StyledImage,
    StyledIconButton,
    StyledImageButtons,
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
 */
function Image(props) {
    const {
        id, // Specify the title to placed on top of the image grid
        src, // Array of image data to be rendered in a horizontal grid
        liked, // Boolean specifying whether the current user has already liked that image
        onClickLikeButton, // Function to be called when a user clicks the heart (like) button
        onClickUnlikeButton, // Function to be called when a user clicks the filled heart (unlike) button
        onClickImage, // Function to be called when a user clicks on the image
    } = props;


    return (
        <StyledImage>
                <img id={id} src={src} alt={id} onClick={onClickImage} />
            <StyledGripButton variant="link">
                <GripVertical />
            </StyledGripButton>
            <StyledImageButtons>
                <OverlayTrigger 
                    placement="bottom"
                    overlay={
                        <Tooltip id={liked ? `tooltip-like` : `tooltip-unlike`}>
                          {liked ? "Unlike" : "Like"}
                        </Tooltip>
                      }
                    >
                    <StyledIconButton
                    variant="link"
                    onClick={liked ? onClickUnlikeButton : onClickLikeButton}
                >
                    {liked ? <HeartFill /> : <Heart />}
                </StyledIconButton>
                </OverlayTrigger>
                <OverlayTrigger 
                    placement="bottom"
                    overlay={
                        <Tooltip id={`tooltip-download`}>
                          {"Download"}
                        </Tooltip>
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
};

export default Image;
