import PropTypes from "prop-types";
import { X } from "react-bootstrap-icons";
import { Modal, Form, Button } from "react-bootstrap";
import { galleryType } from "../../types";
import { ModalTitle, ModalHeader, ModalFooter } from "./style";

/**
 * Modal to add a gallery
 * @param {Object} props - Properties passed to the component
 * @param {boolean} props.showModal - Flag whether the modal to add the image to a gallery should be displayed
 * @param {Function} props.onRequestCloseModal - Function to be called when a user requests to close the modal
 * @param {Function} props.onRequestAddToGallery - Function to be called when a user requests to add the image to a specified gallery
 * @param {Gallery[]} props.galleries - The user's galleries to show as selectables
 */
function AddImageToGalleryModal(props) {
    const { showModal, onRequestCloseModal, onRequestAddToGallery, galleries } =
        props;

    return (
        <Modal show={showModal} onHide={onRequestCloseModal}>
            <ModalHeader className="d-block">
                <ModalTitle className="float-left">
                    Add image to gallery
                </ModalTitle>
                <X className="float-right" onClick={onRequestCloseModal} />
            </ModalHeader>
            <Form onSubmit={onRequestAddToGallery}>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Gallery</Form.Label>
                        <Form.Control name="gallery" as="select">
                            <option value="none">Select a gallery…</option>
                            {galleries.map((gallery) => (
                                <option
                                    key={gallery.id}
                                    id={gallery.id}
                                    name={gallery.id}
                                    value={gallery.id}
                                >
                                    {gallery.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <ModalFooter>
                    <Button
                        variant="outline-secondary"
                        onClick={onRequestCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button variant="dark" type="submit">
                        Add image to gallery
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

AddImageToGalleryModal.propTypes = {
    showModal: PropTypes.bool,
    onRequestCloseModal: PropTypes.func,
    onRequestAddToGallery: PropTypes.func,
    galleries: PropTypes.arrayOf(galleryType),
};

export default AddImageToGalleryModal;
