import { CenterContentDiv, AuthButton, StyledForm } from "../style";
import { Link } from "react-router-dom";
import EmailInput from "../EmailInput";

/**
 * View component for the forgot password page.
 */
function ForgotPasswordView() {
    return (
        <CenterContentDiv className="ForgotPasswordView">
            <StyledForm>
                <p>
                    If you continue, Gallang will send a message to the e-mail
                    address specified below. Click the link in the message, and
                    enter a new password on the page that opens.
                </p>
                <EmailInput />
                <AuthButton type="submit">Send password reset email</AuthButton>
                <Link to="/login">Back to login</Link>
            </StyledForm>
        </CenterContentDiv>
    );
}

export default ForgotPasswordView;
