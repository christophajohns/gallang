import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SidebarAside } from "./style";
import { galleryType } from "../../types";

/**
 * Sidebar to access liked content and access or add galleries
 * @param {Object} props - Properties passed to component
 * @param {Gallery[]} props.galleries - Array with gallery information for the user
 * @param {Function} props.onClickAddGallery - Function to be called when a user clicks the button to add a new gallery
 */
function Sidebar(props) {
    const { galleries, onClickAddGallery } = props;

    return <SidebarAside>This would be the sidebar.</SidebarAside>;
}

Sidebar.propTypes = {
    galleries: PropTypes.arrayOf(galleryType).isRequired,
    onClickAddGallery: PropTypes.func.isRequired,
};

export default Sidebar;
