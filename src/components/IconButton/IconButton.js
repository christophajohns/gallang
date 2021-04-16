import PropTypes from "prop-types";
import { StyledIconButton } from "./style";

/**
 * Button that only displays an icon
 * @param {Object} props - Properties passed to component
 * @param {Node[]} props.children - Children of the component to render inside
 * @param {Function} props.onClick - Function to be called when a user clicks the button
 */
function IconButton(props) {
    const { children, onClick } = props;

    return (
        <StyledIconButton variant="link" onClick={onClick}>
            {children}
        </StyledIconButton>
    );
}

IconButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    onClick: PropTypes.func,
};

export default IconButton;
