import { Link } from "react-router-dom";
import { Inputs, AuthLinks } from "./style";
import { CenterContentDiv, StyledForm, AuthButton } from "../style";
import UserNameInput from "../UserNameInput";
import PasswordInput from "../PasswordInput";

/**
 * View component for the login page.
 */
function LoginView() {
    return (
        <CenterContentDiv className="LoginView">
            <StyledForm>
                <Inputs>
                    <UserNameInput />
                    <PasswordInput />
                </Inputs>
                <AuthButton type="submit">Login</AuthButton>
                <AuthLinks>
                    <Link to="/forgot-password">Forgot password?</Link>
                    <Link to="/signup">Create account</Link>
                </AuthLinks>
            </StyledForm>
        </CenterContentDiv>
    );
}

export default LoginView;
