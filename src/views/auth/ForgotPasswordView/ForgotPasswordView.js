import {
    ForgotPasswordViewDiv,
    ResetPasswordButton,
    FormControl,
    InputGroupText,
    StyledForm,
} from "./style";
import { InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Envelope } from "react-bootstrap-icons";

/**
 * View component for the forgot password page.
 */
function ForgotPasswordView() {
    return (
        <ForgotPasswordViewDiv>
            <StyledForm>
                <p>
                    If you continue, Gallang will send a message to the e-mail
                    address specified below. Click the link in the message, and
                    enter a new password on the page that opens.
                </p>
                <EmailInput />
                <ResetPasswordButton type="submit">
                    Send password reset email
                </ResetPasswordButton>
                <Link to="/login">Back to login</Link>
            </StyledForm>
        </ForgotPasswordViewDiv>
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

export default ForgotPasswordView;
