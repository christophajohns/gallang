import { CenterContentDiv, AuthButton, StyledForm } from "../style";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import EmailInput from "../EmailInput";
import PropTypes from "prop-types";
import { refType } from "../../../types";

/**
 * View component for the forgot password page.
 * @param {Object} props - Properties passed to the component
 * @param {Function} props.onRequestPasswordReset - Function to be called when a user submits the password reset form
 * @param {React.MutableRefObject} props.emailRef - Reference to the email/username input field to handle password reset request
 * @param {boolean} [props.resetRequestWasSuccessful = false] - Flag whether the password reset link request was successfully sent to the user
 * @param {boolean} [props.isLoading = false] - Flag whether the reset request is currently being processed
 * @param {string} props.error - Error message from the password reset request
 */
function ForgotPasswordView(props) {
    const {
        onRequestPasswordReset,
        emailRef,
        resetRequestWasSuccessful = false,
        error,
        isLoading = false,
    } = props;

    return (
        <CenterContentDiv className="ForgotPasswordView">
            <StyledForm onSubmit={onRequestPasswordReset}>
                {error && <Alert variant="danger">{error}</Alert>}
                {resetRequestWasSuccessful && (
                    <Alert variant="success">
                        Check your email inbox for the reset link.
                    </Alert>
                )}
                <p>
                    If you continue, Gallang will send a message to the e-mail
                    address specified below. Click the link in the message, and
                    enter a new password on the page that opens.
                </p>
                <EmailInput emailRef={emailRef} />
                <AuthButton disabled={isLoading} type="submit">
                    {isLoading
                        ? "Processing reset request…"
                        : "Send password reset email"}
                </AuthButton>
                <Link to="/login">Back to login</Link>
            </StyledForm>
        </CenterContentDiv>
    );
}

ForgotPasswordView.propTypes = {
    onRequestPasswordReset: PropTypes.func.isRequired,
    emailRef: refType.isRequired,
    resetRequestWasSuccessful: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};

export default ForgotPasswordView;
