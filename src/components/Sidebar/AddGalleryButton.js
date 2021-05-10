import PropTypes from "prop-types";
import { Plus } from "react-bootstrap-icons";
import SidebarButton from "./SidebarButton";

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

export default AddGalleryButton;
