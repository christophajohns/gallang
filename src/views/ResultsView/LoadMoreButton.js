import PropTypes from "prop-types";
import { StyledButton } from "./style";

/**
 * Button saying "Load more"
 * @param {Object} props - Properties to be passed to the component
 * @param {Function} props.onClickLoadMore - Function to be called when the button is clicked
 * @returns Load more button
 */
function LoadMoreButton(props) {
    const { onClickLoadMore } = props;

    return (
        <StyledButton variant="outline-dark" onClick={onClickLoadMore}>
            Load more
        </StyledButton>
    );
}

LoadMoreButton.propTypes = {
    onClickLoadMore: PropTypes.func.isRequired,
};

export default LoadMoreButton;
