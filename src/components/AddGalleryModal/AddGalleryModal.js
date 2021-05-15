import PropTypes from "prop-types";
import { X, FolderPlus } from "react-bootstrap-icons";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { refType } from "../../types";
import {
    FormControl,
    InputGroupText,
    ModalTitle,
    ModalHeader,
    ModalFooter,
} from "./style";

/**
 * Modal to add a gallery
 * @param {Object} props - Properties passed to the component
 * @param {boolean} props.showModal - Flag whether the modal to add a new gallery should be displayed
 * @param {Function} props.onRequestCloseModal - Function to be called when a user requests to close the modal
 * @param {Function} props.onRequestCreateGallery - Function to be called when a user requests to add the new gallery with the specified name
 * @param {React.MutableRefObject} props.galleryNameRef - Reference to be used on the text input field to specify the name of the new gallery
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
            <ModalHeader className="d-block">
                <ModalTitle className="float-left">
                    Create a new gallery
                </ModalTitle>
                <X className="float-right" onClick={onRequestCloseModal} />
            </ModalHeader>
            <Form onSubmit={onRequestCreateGallery}>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroupText>
                                <FolderPlus />
                            </InputGroupText>
                        </InputGroup.Prepend>
                        <FormControl
                            type="text"
                            required
                            placeholder="Gallery title"
                            ref={galleryNameRef}
                        />
                    </InputGroup>
                </Modal.Body>
                <ModalFooter>
                    <Button
                        variant="outline-secondary"
                        onClick={onRequestCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button variant="dark" type="submit">
                        Add gallery
                    </Button>
                </ModalFooter>
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
