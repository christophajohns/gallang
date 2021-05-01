import { Lock } from "react-bootstrap-icons";
import AuthInputField from "../AuthInputField";
import { refType } from "../../../types";

/**
 * Component to render a the confirm password text input field
 * @param {Object} props - Properties passed to the component
 * @param {React.MutableRefObject} props.confirmPasswordRef - Reference to the confirm password input field to handle signup request
 */
function ConfirmPasswordInput(props) {
    const { confirmPasswordRef } = props;

    return (
        <AuthInputField
            icon={() => <Lock />}
            type="password"
            placeholder="Confirm password"
            name="confirm-password"
            authRef={confirmPasswordRef}
        />
    );
}

ConfirmPasswordInput.propTypes = {
    confirmPasswordRef: refType.isRequired,
};

export default ConfirmPasswordInput;
