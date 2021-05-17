import PropTypes from "prop-types";
import { StyledIconButton } from "./style";

/**
 * Button that only displays an icon
 * @param {Object} props - Properties passed to component
 * @param {Node[]} props.children - Children of the component to render inside
 * @param {Function} props.onClick - Function to be called when a user clicks the button
 * @param {string} [props.className] - Class name to apply to the button component
 */
function IconButton(props) {
    const { children, onClick, className } = props;

    return (
        <StyledIconButton
            variant="link"
            onClick={onClick}
            className={className}
        >
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
    className: PropTypes.string,
};

export default IconButton;
