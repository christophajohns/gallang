import { Envelope } from "react-bootstrap-icons";
import AuthInputField from "./AuthInputField";
import { refType } from "../../types";

/**
 * Component to render a text input field for the email
 * @param {Object} props - Properties passed to the component
 * @param {React.MutableRefObject} userNameRef - Reference to the email input field to handle authentication requests
 */
function EmailInput(props) {
    const { emailRef } = props;

    return (
        <AuthInputField
            icon={() => <Envelope />}
            name="email"
            placeholder="Email"
            type="email"
            authRef={emailRef}
        />
    );
}

EmailInput.propTypes = {
    emailRef: refType.isRequired,
};

export default EmailInput;
