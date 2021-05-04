import { PlusCircle } from "react-bootstrap-icons";
import AuthInputField from "../auth/AuthInputField";
import { refType } from "../../types";

/**
 * Component to render a text input field for the email
 * @param {Object} props - Properties passed to the component
 * @param {React.MutableRefObject} galleryNameRef - Reference to the email input field to handle authentication requests
 */
function EmailInput(props) {
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

EmailInput.propTypes = {
    galleryNameRef: refType.isRequired,
};

export default EmailInput;
