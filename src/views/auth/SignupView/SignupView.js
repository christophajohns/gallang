import { Lock } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { GroupedInputs } from "./style";
import AuthInputField from "../AuthInputField";
import UserNameInput from "../UserNameInput";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import { CenterContentDiv, StyledForm, AuthButton } from "../style";
import { refType } from "../../../types";

/**
 * View component for the login page.
 * @param {Object} props - Properties passed to the view
 * @param {Function} props.onRequestSignup - Function to call when the signup form is submitted
 * @param {React.MutableRefObject} props.emailRef - Reference to the email/username input field to handle signup request
 * @param {React.MutableRefObject} props.passwordRef - Reference to the password input field to handle signup request
 * @param {React.MutableRefObject} props.confirmPasswordRef - Reference to the confirm password input field to handle signup request
 * @param {boolean} [props.isLoading = false] - Flag whether the user is currently being logged in
 * @param {Error} props.error - Error from the login request */
function SignupView(props) {
    const {
        onRequestSignup,
        usernameRef,
        emailRef,
        passwordRef,
        confirmPasswordRef,
        isLoading = false,
        error,
    } = props;

    return (
        <CenterContentDiv className="SignupView">
            <StyledForm onSubmit={onRequestSignup}>
                {error && <Alert variant="danger">{error}</Alert>}
                <UserNameInput usernameRef={usernameRef} />
                <EmailInput emailRef={emailRef} />
                <GroupedInputs>
                    <PasswordInput passwordRef={passwordRef} />
                    <ConfirmPasswordInput
                        confirmPasswordRef={confirmPasswordRef}
                    />
                </GroupedInputs>
                <AuthButton disabled={isLoading} type="submit">
                    {isLoading ? "Creating account…" : "Create account"}
                </AuthButton>
                <div>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </StyledForm>
        </CenterContentDiv>
    );
}

SignupView.propTypes = {
    onRequestSignup: PropTypes.func.isRequired,
    usernameRef: refType.isRequired,
    emailRef: refType.isRequired,
    passwordRef: refType.isRequired,
    confirmPasswordRef: refType.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};

/**
 * Component to render a the confirm password text input field
 * @param {Object} props - Properties passed to the component
 * @param {React.MutableRefObject} props.confirmPasswordRef - Reference to the confirm password input field to handle signup request
 */
function ConfirmPasswordInput(props) {
    const { confirmPasswordRef } = props;

    return (
        <AuthInputField
            icon={() => <Lock />}
            type="password"
            placeholder="Confirm password"
            name="confirm-password"
            authRef={confirmPasswordRef}
        />
    );
}

ConfirmPasswordInput.propTypes = {
    confirmPasswordRef: refType.isRequired,
};

export default SignupView;
