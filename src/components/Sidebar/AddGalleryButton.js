import PropTypes from "prop-types";
import { Plus } from "react-bootstrap-icons";
import SidebarButton from "./SidebarButton";
import { refType } from "../../types";

/**
 * Button to add a gallery
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.onClick - Function to be called when a user clicks the button to add a gallery
 * @param {boolean} props.showModal - Flag whether the modal to add a new gallery should be displayed
 * @param {Function} props.onRequestCloseModal - Function to be called when a user requests to close the modal
 * @param {Function} props.onRequestCreateGallery - Function to be called when a user requests to add the new gallery with the specified name
 * @param {React.MutableRefObject} props.galleryNameRef - Reference to be used on the text input field to specify the name of the new gallery
 * @returns SidebarButton to add a gallery
 */
function AddGalleryButton(props) {
    const {
        onClick,
        showModal,
        onRequestCloseModal,
        onRequestCreateGallery,
        galleryNameRef,
    } = props;

    return (
        <SidebarButton onClick={onClick} name="Add gallery">
            <Plus />
        </SidebarButton>
    );
}

AddGalleryButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    onRequestCloseModal: PropTypes.func,
    onRequestCreateGallery: PropTypes.func,
    galleryNameRef: refType.isRequired,
};

export default AddGalleryButton;
