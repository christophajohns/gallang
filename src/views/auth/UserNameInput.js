import { Person } from "react-bootstrap-icons";
import AuthInputField from "./AuthInputField";

/** Component to render a text input field for the username */
function UserNameInput() {
    return (
        <AuthInputField
            icon={() => <Person />}
            name="username"
            placeholder="Username"
            type="text"
        />
    );
}

export default UserNameInput;
