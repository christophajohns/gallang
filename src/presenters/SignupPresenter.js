import React from "react";
import { useHistory } from "react-router-dom";
import { SignupView } from "../views";
import { AuthenticationService } from "../model";
import { useCurrentUser } from "./customHooks";

/**
 * Presenter for the signup view
 * @returns Signup view
 */
function SignupPresenter() {
    const usernameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const confirmPasswordRef = React.useRef(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [signupError, setSignupError] = React.useState(null);

    const browserHistory = useHistory();
    const currentUser = useCurrentUser();

    // Redirect to home page when the authentication signals that the user is already logged in
    React.useEffect(() => {
        if (currentUser.auth) browserHistory.push("/");
    }, [currentUser, browserHistory]);

    /**
     * Signup user using the authentication model (firebase authentication)
     * @param {Event} event
     */
    async function signupUser(event) {
        event.preventDefault(); // Do not reload page on submit

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            const error = Error(
                "Sorry, password and password confirmation do not match."
            );
            setSignupError(error);
            return;
        }

        try {
            setIsLoading(true);
            await AuthenticationService.createUserWithEmailAndPassword(
                email,
                password
            );
            await AuthenticationService.currentUser.updateProfile({
                displayName: username,
            });
            browserHistory.push("/");
        } catch (error) {
            setSignupError(error);
            setIsLoading(false);
        }
    }

    return (
        <SignupView
            usernameRef={usernameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            confirmPasswordRef={confirmPasswordRef}
            onRequestSignup={(e) => signupUser(e)}
            isLoading={isLoading}
            error={signupError?.message}
        />
    );
}

export default SignupPresenter;
