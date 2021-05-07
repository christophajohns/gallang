import PropTypes from "prop-types";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { StyledIconButton } from "./style";

/**
 * Button to like an image
 * @param {Object} props - Properties passed to the component
 * @param {boolean} props.liked - Flag whether the user has liked this image
 * @param {Function} props.onClickLikeButton - Function to be called when a user clicks the heart (like) button
 * @param {Function} props.onClickUnlikeButton - Function to be called when a user clicks the filled heart (unlike) button
 */
function LikeButton(props) {
    const { liked, onClickLikeButton, onClickUnlikeButton } = props;

    return (
        <StyledIconButton
            variant="link"
            onClick={liked ? onClickUnlikeButton : onClickLikeButton}
        >
            {liked ? <HeartFill /> : <Heart />}
        </StyledIconButton>
    );
}

LikeButton.propTypes = {
    liked: PropTypes.bool.isRequired,
    onClickLikeButton: PropTypes.func.isRequired,
    onClickUnlikeButton: PropTypes.func.isRequired,
};

export default LikeButton;
