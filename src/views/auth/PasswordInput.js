import { Lock } from "react-bootstrap-icons";
import AuthInputField from "./AuthInputField";

/** Component to render a text input field for the password */
function PasswordInput() {
    return (
        <AuthInputField
            icon={() => <Lock />}
            name="password"
            placeholder="Password"
            type="password"
        />
    );
}

export default PasswordInput;
