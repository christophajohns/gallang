import { PlusCircle } from "react-bootstrap-icons";
import AuthInputField from "../auth/AuthInputField"; //The AuthInputField should be made into a separate component not only for auth
import { refType } from "../../types";

/**
 * Component to render a text input field for the email
 * @param {Object} props - Properties passed to the component
 * @param {React.MutableRefObject} galleryNameRef - Reference to the input field to handle requests
 */
function CreateGalleryInput(props) {
    const { galleryNameRef } = props;

    return (
        <AuthInputField
            icon={() => <PlusCircle />}
            name="galleryName"
            placeholder="Gallery name"
            type="text"
            authRef={galleryNameRef}
        />
    );
}

CreateGalleryInput.propTypes = {
    galleryNameRef: refType.isRequired,
};

export default CreateGalleryInput;
