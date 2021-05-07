import PropTypes from "prop-types";
import { ChevronLeft } from "react-bootstrap-icons";
import { StyledIconButton } from "./style";

/**
 * Button to return to the previous page
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.onClickBackButton - Function to be called when a user clicks on the button to return to the previous page
 */
function BackButton(props) {
    const { onClickBackButton } = props;

    return (
        <StyledIconButton variant="link" onClick={onClickBackButton}>
            <ChevronLeft />
        </StyledIconButton>
    );
}

BackButton.propTypes = {
    onClickBackButton: PropTypes.func.isRequired,
};

export default BackButton;
