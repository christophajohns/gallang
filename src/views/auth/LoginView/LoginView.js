import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { Inputs, AuthLinks } from "./style";
import { CenterContentDiv, StyledForm, AuthButton } from "../style";
import { refType } from "../../../types";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";

/**
 * View component for the login page.
 * @param {Object} props - Properties passed to the view
 * @param {Function} props.onRequestLogin - Function to call when the login form is submitted
 * @param {React.MutableRefObject} props.emailRef - Reference to the email/username input field to handle login request
 * @param {React.MutableRefObject} props.passwordRef - Reference to the password input field to handle login request
 * @param {boolean} [props.isLoading = false] - Flag whether the user is currently being logged in
 * @param {string} props.error - Error message from the login request
 */
function LoginView(props) {
    const {
        onRequestLogin,
        emailRef,
        passwordRef,
        isLoading = false,
        error,
    } = props;

    return (
        <CenterContentDiv className="LoginView">
            <StyledForm onSubmit={onRequestLogin}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Inputs>
                    <EmailInput emailRef={emailRef} />
                    <PasswordInput passwordRef={passwordRef} />
                </Inputs>
                <AuthButton type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in…" : "Login"}
                </AuthButton>
                <AuthLinks>
                    <Link to="/forgot-password">Forgot password?</Link>
                    <Link to="/signup">Create account</Link>
                </AuthLinks>
            </StyledForm>
        </CenterContentDiv>
    );
}

LoginView.propTypes = {
    onRequestLogin: PropTypes.func.isRequired,
    emailRef: refType.isRequired,
    passwordRef: refType.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};

export default LoginView;
