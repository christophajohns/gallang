import { Lock } from "react-bootstrap-icons";
import AuthInputField from "./AuthInputField";
import { refType } from "../../types";
import PropTypes from "prop-types";

/**
 * Component to render a text input field for the password
 * @param {Object} props - Properties passed to the component
 * @param {React.MutableRefObject} passwordRef - Reference to the password input field to handle authentication requests
 * @param {Function} onChangePasswordField - Function to be called when the input value changes in the password field
 */
function PasswordInput(props) {
    const { passwordRef, onChangePasswordField } = props;

    return (
        <AuthInputField
            icon={() => <Lock />}
            name="password"
            placeholder="Password"
            type="password"
            authRef={passwordRef}
            onChange={onChangePasswordField}
        />
    );
}

PasswordInput.propTypes = {
    passwordRef: refType.isRequired,
    onChangePasswordField: PropTypes.func,
};

export default PasswordInput;
