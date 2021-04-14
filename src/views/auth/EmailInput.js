import { Envelope } from "react-bootstrap-icons";
import AuthInputField from "./AuthInputField";

/** Component to render a text input field for the email */
function EmailInput() {
    return (
        <AuthInputField
            icon={() => <Envelope />}
            name="email"
            placeholder="Email"
            type="email"
        />
    );
}

export default EmailInput;
