import PropTypes from "prop-types";
import { X } from "react-bootstrap-icons";
import { Modal, Form, Button } from "react-bootstrap";
import { galleryType } from "../../types";
import { ModalTitle, ModalHeader, ModalFooter } from "./style";

/**
 * Modal to add an image to a gallery
 * @param {Object} props - Properties passed to the component
 * @param {boolean} props.showModal - Flag whether the modal to add the image to a gallery should be displayed
 * @param {Function} props.onRequestCloseModal - Function to be called when a user requests to close the modal
 * @param {Function} props.onRequestAddToGallery - Function to be called when a user requests to add the image to a specified gallery
 * @param {Gallery[]} props.galleries - The user's galleries to show as selectables
 * @param {Function} props.onOptionChange - Function to be called when the user selects an option in the modal
 * @param {Function} props.modalValid - Boolean specifying if the selected option in the modal is a valid option
 */
function AddImageToGalleryModal(props) {
    const {
        showModal,
        onRequestCloseModal,
        onRequestAddToGallery,
        galleries,
        onOptionChange,
        modalValid,
    } = props;

    return (
        <Modal show={showModal} onHide={onRequestCloseModal}>
            <ModalHeader className="d-block">
                <ModalTitle className="float-left">
                    Would you also like to add the image to a gallery?
                </ModalTitle>
                <X className="float-right" onClick={onRequestCloseModal} />
            </ModalHeader>
            <Form onSubmit={onRequestAddToGallery}>
                <Modal.Body>
                    <Form.Group
                        controlId="exampleForm.SelectCustom"
                        onChange={onOptionChange}
                    >
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
                        No, keep it as liked
                    </Button>
                    <Button
                        variant="dark"
                        type="submit"
                        disabled={modalValid ? false : true}
                    >
                        Yes, Add image to gallery
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
    onOptionChange: PropTypes.func,
    modalValid: PropTypes.bool,
};

export default AddImageToGalleryModal;
