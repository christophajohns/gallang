import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Plus } from "react-bootstrap-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { SidebarAside, StyledSidebarButton } from "./style";
import { galleryType } from "../../types";
import { IconButton } from "../../components";

/**
 * Sidebar to access liked content and access or add galleries
 * @param {Object} props - Properties passed to component
 * @param {Gallery[]} props.galleries - Array with gallery information for the user
 * @param {Function} props.onClickAddGallery - Function to be called when a user clicks the button to add a new gallery
 * @param {boolean} [props.expanded = false] - Flag whether the sidebar should be expanded or not
 * @param {Function} props.onClickExpandCollapseButton - Function to be called when a user clicks on the button to expand/collapse the sidebar
 */
function Sidebar(props) {
    const {
        galleries,
        onClickAddGallery,
        expanded = false,
        onClickExpandCollapseButton,
    } = props;

    return (
        <SidebarAside>
            <IconButton onClick={onClickExpandCollapseButton}>
                {expanded ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
            <LikedContentButton />
            {galleries.map((gallery) => (
                <GalleryButton key={gallery.id} gallery={gallery} />
            ))}
            <AddGalleryButton onClickAddGallery={onClickAddGallery} />
        </SidebarAside>
    );
}

/** Button linking to the user's liked content */
function LikedContentButton() {
    return (
        <SidebarButton name="Liked content">
            <Link to="/liked">
                <Heart />
            </Link>
        </SidebarButton>
    );
}

/**
 * Button linking to the specified gallery
 * @param {Object} props - Properties passed to the component
 * @param {Gallery} props.gallery - Gallery to link to
 * @returns SidebarButton to view a gallery
 */
function GalleryButton(props) {
    const { gallery } = props;
    const { title = "Example Gallery" } = gallery;

    const galleryInitial = title && title.charAt(0).toUpperCase();

    return (
        <SidebarButton name={title}>
            <div>{galleryInitial}</div>
        </SidebarButton>
    );
}

GalleryButton.propTypes = {
    gallery: galleryType.isRequired,
};

/**
 * Button to add a gallery
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.onClickAddGallery - Function to be called when a user clicks the button to add a gallery
 * @returns SidebarButton to add a gallery
 */
function AddGalleryButton(props) {
    const { onClickAddGallery } = props;

    return (
        <SidebarButton onClick={onClickAddGallery} name="Add gallery">
            <Plus />
        </SidebarButton>
    );
}

AddGalleryButton.propTypes = {
    onClickAddGallery: PropTypes.func.isRequired,
};

/**
 * Button in the collapsed sidebar
 * @param {Object} props - Properties passed to the component
 * @param {Node} props.children - Elements to render as children of the button
 * @param {string} [props.name] - Name of the button to display in a tooltip
 * @returns SidebarButton to add a gallery
 */
function SidebarButton(props) {
    const { children, name } = props;

    const button = (
        <StyledSidebarButton variant="light">{children}</StyledSidebarButton>
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

Sidebar.propTypes = {
    galleries: PropTypes.arrayOf(galleryType).isRequired,
    onClickAddGallery: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
};

export default Sidebar;
