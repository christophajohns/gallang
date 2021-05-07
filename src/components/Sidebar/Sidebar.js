import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { SidebarAside, ExpandedSidebarDiv, StyledIconButton } from "./style";
import { galleryType, imageType } from "../../types";
import { HorizontalGridPresenter } from "../../presenters";
import { modelType } from "../../presenters/ImagePresenter";
import AddGalleryButton from "./AddGalleryButton";
import GalleryButton from "./GalleryButton";
import LikedContent from "./LikedContent";
import LikedContentButton from "./LikedContentButton";

/**
 * Sidebar to access liked content and access or add galleries
 * @param {Object} props - Properties passed to component
 * @param {Gallery[]} props.galleries - Array with gallery information for the user
 * @param {Function} props.onClickAddGallery - Function to be called when a user clicks the button to add a new gallery
 * @param {boolean} [props.expanded = false] - Flag whether the sidebar should be expanded or not
 * @param {Function} props.onClickExpandCollapseButton - Function to be called when a user clicks on the button to expand/collapse the sidebar
 * @param {Image[]} props.likedImages - Array of images that the user has liked
 * @param {boolean} [props.isDropTarget] - Flag whether the horizontal grids should display the image placeholder as a drop target
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
        isDropTarget,
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
                    <LikedContent
                        likedImages={likedImages}
                        model={model}
                        isDropTarget={isDropTarget}
                    />
                    {galleries.map((gallery) => (
                        <HorizontalGridPresenter
                            key={gallery.id}
                            id={gallery.id}
                            type="gallery"
                            href={`/gallery/${gallery.id}`}
                            title={gallery.title}
                            images={gallery.images}
                            small={true}
                            emptyStateText={"Drag here to add to gallery"}
                            isDropTarget={isDropTarget}
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
                        isDropTarget={isDropTarget}
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

Sidebar.propTypes = {
    galleries: PropTypes.arrayOf(galleryType).isRequired,
    onClickAddGallery: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
    likedImages: PropTypes.arrayOf(imageType),
    model: modelType,
};

export default Sidebar;
