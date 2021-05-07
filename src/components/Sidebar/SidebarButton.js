import PropTypes from "prop-types";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { StyledSidebarButton } from "./style";

/**
 * Button in the collapsed sidebar
 * @param {Object} props - Properties passed to the component
 * @param {Node} props.children - Elements to render as children of the button
 * @param {string} [props.name] - Name of the button to display in a tooltip
 * @param {Function} [props.onClick] - Function to be called when a user clicks on the button
 * @returns SidebarButton to add a gallery
 */
function SidebarButton(props) {
    const { children, name, onClick } = props;

    const button = (
        <StyledSidebarButton variant="light" onClick={onClick}>
            {children}
        </StyledSidebarButton>
    );

    const buttonWithOverlay = (
        <OverlayTrigger
            placement="left"
            overlay={<Tooltip id={`tooltip-${name}`}>{name}</Tooltip>}
        >
            {button}
        </OverlayTrigger>
    );

    return name ? buttonWithOverlay : button;
}

SidebarButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    name: PropTypes.string,
};

export default SidebarButton;
