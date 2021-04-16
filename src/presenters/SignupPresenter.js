import React from "react";
import { useHistory } from "react-router-dom";
import { SignupView } from "../views";
import { AuthenticationModel } from "../model";

/**
 * Presenter for the signup view
 * @returns Signup view
 */
function SignupPresenter() {
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const confirmPasswordRef = React.useRef(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [signupError, setSignupError] = React.useState(null);

    const browserHistory = useHistory();

    /**
     * Signup user using the authentication model (firebase authentication)
     * @param {Event} event
     */
    async function signupUser(event) {
        event.preventDefault(); // Do not reload page on submit

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
            await AuthenticationModel.createUserWithEmailAndPassword(
                email,
                password
            );
            browserHistory.push("/");
        } catch (error) {
            setSignupError(error);
            setIsLoading(false);
        }
    }

    return (
        <SignupView
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
