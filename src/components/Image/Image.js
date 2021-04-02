import {
    Download,
    GripVertical,
    Heart,
    HeartFill,
} from "react-bootstrap-icons";
import PropTypes from "prop-types";
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
 * @returns
 */
function Image(props) {
    const {
        id, // Specify the title to placed on top of the image grid
        src, // Array of image data to be rendered in a horizontal grid
        liked, // Boolean specifying whether the current user has already liked that image
    } = props;

    return (
        <StyledImage>
            <img id={id} src={src} alt={id} />
            <StyledGripButton variant="link">
                <GripVertical />
            </StyledGripButton>
            <StyledImageButtons>
                <StyledIconButton variant="link">
                    {liked ? <HeartFill /> : <Heart />}
                </StyledIconButton>
                <StyledIconButton variant="link">
                    <Download />
                </StyledIconButton>
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
};

export default Image;
