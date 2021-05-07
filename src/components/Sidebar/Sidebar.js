import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Plus } from "react-bootstrap-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
    SidebarAside,
    StyledSidebarButton,
    ExpandedSidebarDiv,
    StyledIconButton,
} from "./style";
import { galleryType } from "../../types";

/**
 * Sidebar to access liked content and access or add galleries
 * @param {Object} props - Properties passed to component
 * @param {Gallery[]} props.galleriesData - Array with gallery information for the user
 * @param {Object | Function} props.galleries - Slot to render galleries and their images
 * @param {Function} props.onClickAddGallery - Function to be called when a user clicks the button to add a new gallery
 * @param {boolean} [props.expanded = false] - Flag whether the sidebar should be expanded or not
 * @param {Function} props.onClickExpandCollapseButton - Function to be called when a user clicks on the button to expand/collapse the sidebar
 * @param {Image[]} props.likedImages - Array of images that the user has liked
 * @param {boolean} [props.isDropTarget] - Flag whether the horizontal grids should display the image placeholder as a drop target
 */
function Sidebar(props) {
    const {
        galleries,
        galleriesData,
        onClickAddGallery,
        expanded = false,
        onClickExpandCollapseButton,
        likedContent,
        newGallery,
    } = props;

    return (
        <SidebarAside expanded={expanded}>
            <StyledIconButton
                onClick={onClickExpandCollapseButton}
                expanded={expanded}
            >
                {expanded ? <ChevronRight /> : <ChevronLeft />}
            </StyledIconButton>
            {expanded ? (
                <ExpandedSidebarDiv>
                    {likedContent}
                    {galleries}
                    {newGallery}
                </ExpandedSidebarDiv>
            ) : (
                <>
                    <LikedContentButton />
                    {galleriesData.map((gallery) => (
                        <GalleryButton key={gallery.id} gallery={gallery} />
                    ))}
                    <AddGalleryButton onClickAddGallery={onClickAddGallery} />
                </>
            )}
        </SidebarAside>
    );
}

/** Button linking to the user's liked content */
function LikedContentButton() {
    return (
        <Link to="/liked">
            <SidebarButton name="Liked content">
                <Heart />
            </SidebarButton>
        </Link>
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
        <Link to={`/gallery/${gallery.id}`}>
            <SidebarButton name={title}>
                <div>{galleryInitial}</div>
            </SidebarButton>
        </Link>
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

Sidebar.propTypes = {
    galleriesData: PropTypes.arrayOf(galleryType).isRequired,
    galleries: PropTypes.node,
    newGallery: PropTypes.node,
    likedContent: PropTypes.node,
    onClickAddGallery: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
};

export default Sidebar;
