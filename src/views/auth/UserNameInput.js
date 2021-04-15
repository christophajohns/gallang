import { Person } from "react-bootstrap-icons";
import AuthInputField from "./AuthInputField";

/**
 * Component to render a text input field for the username
 * @param {Object} props - Properties passed to the component
 * @param {React.MutableRefObject} userNameRef - Reference to the username input field to handle authentication requests
 */
function UserNameInput(props) {
    const { userNameRef } = props;

    return (
        <AuthInputField
            icon={() => <Person />}
            name="username"
            placeholder="Username"
            type="text"
            authRef={userNameRef}
        />
    );
}

export default UserNameInput;
