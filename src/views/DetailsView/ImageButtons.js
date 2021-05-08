import PropTypes from "prop-types";
import LikeButton from "./LikeButton";
import InfoButton from "./InfoButton";
import DownloadButton from "./DownloadButton";
import { StyledOptionContainer } from "./style";

/**
 * Component to like or download an image or view its information
 * @param {Object} props - Properties passed to the component
 * @param {string} props.url - URL of the image source
 * @param {boolean} props.liked - Flag whether the user has liked this image
 * @param {Function} props.onClickLikeButton - Function to be called when a user clicks the heart (like) button
 * @param {Function} props.onClickUnlikeButton - Function to be called when a user clicks the filled heart (unlike) button
 */
function ImageButtons(props) {
    const { liked, onClickLikeButton, onClickUnlikeButton, url } = props;

    return (
        <StyledOptionContainer>
            <InfoButton />
            <LikeButton
                liked={liked}
                onClickLikeButton={onClickLikeButton}
                onClickUnlikeButton={onClickUnlikeButton}
            />
            <DownloadButton url={url} />
        </StyledOptionContainer>
    );
}

ImageButtons.propTypes = {
    liked: PropTypes.bool.isRequired,
    onClickLikeButton: PropTypes.func.isRequired,
    onClickUnlikeButton: PropTypes.func.isRequired,
};

export default ImageButtons;
