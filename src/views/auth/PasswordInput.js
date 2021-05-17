import { Lock } from "react-bootstrap-icons";
import AuthInputField from "./AuthInputField";
import { refType } from "../../types";

/**
 * Component to render a text input field for the password
 * @param {Object} props - Properties passed to the component
 * @param {React.MutableRefObject} passwordRef - Reference to the password input field to handle authentication requests
 */
function PasswordInput(props) {
    const { passwordRef } = props;

    return (
        <AuthInputField
            icon={() => <Lock />}
            name="password"
            placeholder="Password"
            type="password"
            minLength="6"
            authRef={passwordRef}
        />
    );
}

PasswordInput.propTypes = {
    passwordRef: refType.isRequired,
};

export default PasswordInput;
