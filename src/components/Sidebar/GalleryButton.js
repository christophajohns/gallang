import { Link } from "react-router-dom";
import { galleryType } from "../../types";
import SidebarButton from "./SidebarButton";

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

export default GalleryButton;
