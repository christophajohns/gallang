import { Person, Lock } from "react-bootstrap-icons";
import { InputGroup, Form } from "react-bootstrap";
import {
    LoginViewDiv,
    StyledForm,
    Inputs,
    LoginButton,
    FormControl,
    InputGroupText,
} from "./style";

/**
 * View component for the login page.
 */
function LoginView() {
    return (
        <LoginViewDiv className="LoginView">
            <StyledForm>
                <Inputs>
                    <UserNameInput />
                    <PasswordInput />
                </Inputs>
                <LoginButton type="submit">Login</LoginButton>
            </StyledForm>
        </LoginViewDiv>
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

/** Component to render a text input field for the password */
function PasswordInput() {
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
                placeholder="Password"
                name="password"
            />
        </InputGroup>
    );
}

export default LoginView;
