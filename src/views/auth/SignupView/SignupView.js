import { Person, Lock, Envelope } from "react-bootstrap-icons";
import { InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    SignupViewDiv,
    StyledForm,
    GroupedInputs,
    LoginButton,
    FormControl,
    InputGroupText,
} from "./style";

/**
 * View component for the login page.
 */
function SignupView() {
    return (
        <SignupViewDiv className="SignupView">
            <StyledForm>
                <UserNameInput />
                <EmailInput />
                <GroupedInputs>
                    <PasswordInput />
                    <ConfirmPasswordInput />
                </GroupedInputs>
                <LoginButton type="submit">Create account</LoginButton>
                <div>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </StyledForm>
        </SignupViewDiv>
    );
}

/** Component to render a text input field for the username */
function UserNameInput() {
    return (
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroupText>
                    <Person />
                </InputGroupText>
            </InputGroup.Prepend>
            <FormControl
                type="text"
                required
                placeholder="Username"
                name="username"
            />
        </InputGroup>
    );
}

/** Component to render a text input field for the email */
function EmailInput() {
    return (
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroupText>
                    <Envelope />
                </InputGroupText>
            </InputGroup.Prepend>
            <FormControl
                type="email"
                required
                placeholder="Email"
                name="email"
            />
        </InputGroup>
    );
}

/**
 * Component to render a text input field for the password
 * @param {Object} props - Properties passed to the component
 * @param {string} props.placeholder - Placeholder for the text input field (used for confirm password)
 * @param {string} props.name - Placeholder for the text input field (used for confirm password)
 */
function PasswordInput(props) {
    const { placeholder = "Password", name = "password" } = props;

    return (
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroupText>
                    <Lock />
                </InputGroupText>
            </InputGroup.Prepend>
            <FormControl
                type="password"
                required
                placeholder={placeholder}
                name={name}
            />
        </InputGroup>
    );
}

/**
 * Component to render a the confirm password text input field
 */
function ConfirmPasswordInput() {
    return (
        <PasswordInput placeholder="Confirm password" name="confirm-password" />
    );
}

export default SignupView;
