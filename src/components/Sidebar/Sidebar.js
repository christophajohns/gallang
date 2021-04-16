import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ChevronLeft, Heart, Plus } from "react-bootstrap-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { SidebarAside, StyledSidebarButton } from "./style";
import { galleryType } from "../../types";
import { IconButton } from "../../components";

/**
 * Sidebar to access liked content and access or add galleries
 * @param {Object} props - Properties passed to component
 * @param {Gallery[]} props.galleries - Array with gallery information for the user
 * @param {Function} props.onClickAddGallery - Function to be called when a user clicks the button to add a new gallery
 */
function Sidebar(props) {
    const { galleries, onClickAddGallery } = props;

    return (
        <SidebarAside>
            <IconButton>
                <ChevronLeft />
            </IconButton>
            <LikedContentButton />
            {galleries.map((gallery) => (
                <GalleryButton gallery={gallery} />
            ))}
            <AddGalleryButton onClickAddGallery={onClickAddGallery} />
        </SidebarAside>
    );
}

function LikedContentButton() {
    return (
        <SidebarButton name="Liked content">
            <Link to="/liked">
                <Heart />
            </Link>
        </SidebarButton>
    );
}

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

function AddGalleryButton(props) {
    const { onClickAddGallery } = props;

    return (
        <SidebarButton onClick={onClickAddGallery} name="Add gallery">
            <Plus />
        </SidebarButton>
    );
}

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

Sidebar.propTypes = {
    galleries: PropTypes.arrayOf(galleryType).isRequired,
    onClickAddGallery: PropTypes.func.isRequired,
};

export default Sidebar;
