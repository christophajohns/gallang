import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { galleryType } from "../../types";
import AddGalleryButton from "./AddGalleryButton";
import GalleryButton from "./GalleryButton";
import LikedContentButton from "./LikedContentButton";
import {
    SidebarAside,
    ExpandedSidebarDiv,
    StyledIconButton,
} from "./style";

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

Sidebar.propTypes = {
    galleriesData: PropTypes.arrayOf(galleryType).isRequired,
    galleries: PropTypes.node,
    newGallery: PropTypes.node,
    likedContent: PropTypes.node,
    onClickAddGallery: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
};

export default Sidebar;
