import { CenterContentDiv, AuthButton, StyledForm } from "../style";
import { Link } from "react-router-dom";
import EmailInput from "../EmailInput";
import PropTypes from "prop-types";
import { refType } from "../../../types";

/**
 * View component for the forgot password page.
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.onRequestPasswordReset - Function to be called when a user submits the password reset form
 * @param {React.MutableRefObject} emailRef - Reference to the email/username input field to handle password reset request
 */
function ForgotPasswordView(props) {
    const { onRequestPasswordReset, emailRef } = props;

    return (
        <CenterContentDiv className="ForgotPasswordView">
            <StyledForm onSubmit={onRequestPasswordReset}>
                <p>
                    If you continue, Gallang will send a message to the e-mail
                    address specified below. Click the link in the message, and
                    enter a new password on the page that opens.
                </p>
                <EmailInput emailRef={emailRef} />
                <AuthButton type="submit">Send password reset email</AuthButton>
                <Link to="/login">Back to login</Link>
            </StyledForm>
        </CenterContentDiv>
    );
}

ForgotPasswordView.propTypes = {
    onRequestPasswordReset: PropTypes.func.isRequired,
    emailRef: refType.isRequired,
};

export default ForgotPasswordView;
