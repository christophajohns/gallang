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
import { galleryType, imageType } from "../../types";
import { HorizontalGridPresenter } from "../../presenters";
import { modelType } from "../../presenters/ImagePresenter";

/**
 * Sidebar to access liked content and access or add galleries
 * @param {Object} props - Properties passed to component
 * @param {Gallery[]} props.galleries - Array with gallery information for the user
 * @param {Function} props.onClickAddGallery - Function to be called when a user clicks the button to add a new gallery
 * @param {boolean} [props.expanded = false] - Flag whether the sidebar should be expanded or not
 * @param {Function} props.onClickExpandCollapseButton - Function to be called when a user clicks on the button to expand/collapse the sidebar
 * @param {Image[]} props.likedImages - Array of images that the user has liked
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function Sidebar(props) {
    const {
        galleries,
        onClickAddGallery,
        expanded = false,
        onClickExpandCollapseButton,
        likedImages,
        model,
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
                    <LikedContent likedImages={likedImages} model={model} />
                    {galleries.map((gallery) => (
                        <HorizontalGridPresenter
                            key={gallery.id}
                            id={gallery.id}
                            type="gallery"
                            title={gallery.title}
                            images={gallery.images}
                            small={true}
                            emptyStateText={"Drag here to add to gallery"}
                            model={model}
                        />
                    ))}
                    <HorizontalGridPresenter
                        id="newGallery"
                        type="gallery"
                        title="New Gallery"
                        images={[]}
                        small={true}
                        emptyStateText={"Drag here to create a new gallery"}
                        model={model}
                    />
                </ExpandedSidebarDiv>
            ) : (
                <>
                    <LikedContentButton />
                    {galleries.map((gallery) => (
                        <GalleryButton key={gallery.id} gallery={gallery} />
                    ))}
                    <AddGalleryButton onClickAddGallery={onClickAddGallery} />
                </>
            )}
        </SidebarAside>
    );
}

/**
 *
 * @param {Object} props - Properties passed to the component
 * @param {Image[]} props.likedImages - Array of images that the user has liked
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 * @returns HorizontalGridPresenter displaying the images specified
 */
function LikedContent(props) {
    const { likedImages, model } = props;

    return (
        <HorizontalGridPresenter
            id="likedContent"
            title="Liked content"
            href="/liked"
            images={likedImages}
            model={model}
            small={true}
            emptyStateText={"Click on the heart icon to like an image"}
        />
    );
}

LikedContent.propTypes = {
    likedImages: PropTypes.arrayOf(imageType),
    model: modelType,
};

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
            <Link to="/new-gallery">
                <Plus />
            </Link>
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
    galleries: PropTypes.arrayOf(galleryType).isRequired,
    onClickAddGallery: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
    likedImages: PropTypes.arrayOf(imageType),
    model: modelType,
};

export default Sidebar;
