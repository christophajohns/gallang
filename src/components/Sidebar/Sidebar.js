import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { galleryType, refType } from "../../types";
import AddGalleryButton from "./AddGalleryButton";
import GalleryButton from "./GalleryButton";
import LikedContentButton from "./LikedContentButton";
import { SidebarAside, ExpandedSidebarDiv, StyledIconButton } from "./style";

/**
 * Sidebar to access liked content and access or add galleries
 * @param {Object} props - Properties passed to component
 * @param {Gallery[]} props.galleriesData - Array with gallery information for the user
 * @param {Object | Function} props.galleries - Slot to render galleries and their images
 * @param {Function} props.onClickAddGalleryButton - Function to be called when a user clicks the button to add a new gallery
 * @param {boolean} [props.expanded = false] - Flag whether the sidebar should be expanded or not
 * @param {Function} props.onClickExpandCollapseButton - Function to be called when a user clicks on the button to expand/collapse the sidebar
 * @param {Image[]} props.likedImages - Array of images that the user has liked
 * @param {boolean} [props.isDropTarget] - Flag whether the horizontal grids should display the image placeholder as a drop target
 * @param {boolean} props.showModal - Flag whether the modal to add a new gallery should be displayed
 * @param {Function} props.onRequestCloseModal - Function to be called when a user requests to close the modal
 * @param {Function} props.onRequestCreateGallery - Function to be called when a user requests to add the new gallery with the specified name
 * @param {React.MutableRefObject} props.galleryNameRef - Reference to be used on the text input field to specify the name of the new gallery
 */
function Sidebar(props) {
    const {
        galleries,
        galleriesData,
        onClickAddGalleryButton,
        expanded = false,
        onClickExpandCollapseButton,
        likedContent,
        newGallery,
        showModal,
        onRequestCloseModal,
        onRequestCreateGallery,
        galleryNameRef,
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
                    <AddGalleryButton
                        onClick={onClickAddGalleryButton}
                        showModal={showModal}
                        onRequestCloseModal={onRequestCloseModal}
                        onRequestCreateGallery={onRequestCreateGallery}
                        galleryNameRef={galleryNameRef}
                    />
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
    onClickAddGalleryButton: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
    showModal: PropTypes.bool,
    onRequestCloseModal: PropTypes.func,
    onRequestCreateGallery: PropTypes.func,
    galleryNameRef: refType.isRequired,
};

export default Sidebar;
