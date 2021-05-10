import PropTypes from "prop-types";
import { X } from "react-bootstrap-icons";
import { Modal, Form, Button } from "react-bootstrap";
import { refType } from "../../types";

/**
 * Modal to add a gallery
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.onClick - Function to be called when a user clicks the button to add a gallery
 * @param {boolean} props.showModal - Flag whether the modal to add a new gallery should be displayed
 * @param {Function} props.onRequestCloseModal - Function to be called when a user requests to close the modal
 * @param {Function} props.onRequestCreateGallery - Function to be called when a user requests to add the new gallery with the specified name
 * @param {React.MutableRefObject} props.galleryNameRef - Reference to be used on the text input field to specify the name of the new gallery
 * @returns SidebarButton to add a gallery
 */
function AddGalleryModal(props) {
    const {
        showModal,
        onRequestCloseModal,
        onRequestCreateGallery,
        galleryNameRef,
    } = props;

    return (
        <Modal show={showModal} onHide={onRequestCloseModal}>
            <Modal.Header className="d-block">
                <X className="float-right" onClick={onRequestCloseModal} />
            </Modal.Header>
            <Form onSubmit={onRequestCreateGallery}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Gallery title</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="e.g. Dark and Moody"
                            ref={galleryNameRef}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-secondary"
                        onClick={onRequestCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button variant="dark" type="submit">
                        Add gallery
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

AddGalleryModal.propTypes = {
    showModal: PropTypes.bool,
    onRequestCloseModal: PropTypes.func,
    onRequestCreateGallery: PropTypes.func,
    galleryNameRef: refType.isRequired,
};

export default AddGalleryModal;
