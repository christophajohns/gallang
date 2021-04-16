import { Lock } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { GroupedInputs } from "./style";
import AuthInputField from "../AuthInputField";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import { CenterContentDiv, StyledForm, AuthButton } from "../style";

/**
 * View component for the login page.
 */
function SignupView() {
    return (
        <CenterContentDiv className="SignupView">
            <StyledForm>
                <EmailInput />
                <GroupedInputs>
                    <PasswordInput />
                    <ConfirmPasswordInput />
                </GroupedInputs>
                <AuthButton type="submit">Create account</AuthButton>
                <div>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </StyledForm>
        </CenterContentDiv>
    );
}

/**
 * Component to render a the confirm password text input field
 */
function ConfirmPasswordInput() {
    return (
        <AuthInputField
            icon={() => <Lock />}
            type="password"
            placeholder="Confirm password"
            name="confirm-password"
        />
    );
}

export default SignupView;
