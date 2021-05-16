import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { GroupedInputs } from "./style";
import UsernameInput from "../UsernameInput";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import { CenterContentDiv, StyledForm, AuthButton, StyledTitle } from "../style";
import { refType } from "../../../types";

/**
 * View component for the login page.
 * @param {Object} props - Properties passed to the view
 * @param {Function} props.onRequestSignup - Function to call when the signup form is submitted
 * @param {React.MutableRefObject} props.usernameRef - Reference to the username input field to handle signup request
 * @param {React.MutableRefObject} props.emailRef - Reference to the email input field to handle signup request
 * @param {React.MutableRefObject} props.passwordRef - Reference to the password input field to handle signup request
 * @param {React.MutableRefObject} props.confirmPasswordRef - Reference to the confirm password input field to handle signup request
 * @param {boolean} [props.isLoading = false] - Flag whether the user is currently being logged in
 * @param {Error} props.error - Error from the login request
 * @param {Function} onChangePasswordField - Function to be called when the input value changes in the password field
 */
function SignupView(props) {
    const {
        onRequestSignup,
        usernameRef,
        emailRef,
        passwordRef,
        confirmPasswordRef,
        isLoading = false,
        error,
        onChangePasswordField,
    } = props;

    return (
        <CenterContentDiv className="SignupView">
            <StyledForm onSubmit={onRequestSignup}>
                <StyledTitle>
                    Sign up to Gallang
                </StyledTitle>
                {error && <Alert variant="danger">{error}</Alert>}
                <UsernameInput usernameRef={usernameRef} />
                <EmailInput emailRef={emailRef} />
                <GroupedInputs>
                    <PasswordInput passwordRef={passwordRef} onChangePasswordField={onChangePasswordField}/>
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
    onChangePasswordField: PropTypes.func,
};
export default SignupView;
