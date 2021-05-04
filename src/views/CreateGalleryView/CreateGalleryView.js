import { CenterContentDiv, StyledForm, Inputs, } from "./style.js";
import { Alert, Button } from "react-bootstrap";
import { refType } from "../../types";
import CreateGalleryInput from "./CreateGalleryInput";

/**
 * View for naming and creating a new gallery
 * @param {Object} props - Properties passed to the view
 * @param {Function} props.onRequestCreateGallery - Function that creates the gallery
 * @param {React.MutableRefObject} props.galleryNameRef - Reference to the gallery name input field to handle request
 * @param {boolean} [props.isLoading = false] - Flag whether the gallery is being created
 * @param {string} props.error - Error message from the createGalleryRequest
 * */

function CreateGalleryView(props) {
    const {
        onRequestCreateGallery,
        galleryNameRef, 
        isLoading = false,
        error,
    } = props;

    return (
        <CenterContentDiv className="CreateGalleryView">
        <StyledForm onSubmit={onRequestCreateGallery}>
            {error && <Alert variant="danger">{error}</Alert>}
            <p>create gallery here</p>
            <Inputs>
                <CreateGalleryInput passwordRef={galleryNameRef} />
            </Inputs>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in…" : "Login"}
            </Button>
        </StyledForm>
    </CenterContentDiv>
    );
}

/*CreateGalleryView.propTypes = {
    onRequestCreateGallery: PropTypes.func.isRequired,
    galleryNameRef: refType.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};*/

export default CreateGalleryView;