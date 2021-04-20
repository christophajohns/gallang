import React from "react";
import { useHistory } from "react-router";
import { ForgotPasswordView } from "../views";
import { useCurrentUser } from "./customHooks";
import { AuthenticationModel } from "../model";

/**
 * Presenter for the forgot password view
 * @returns Forgot password view
 */
function ForgotPasswordPresenter() {
    const emailRef = React.useRef(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [passwordResetError, setPasswordResetError] = React.useState(null);
    const [
        passwordResetSuccessful,
        setPasswordResetSuccessful,
    ] = React.useState(null);

    const currentUser = useCurrentUser();
    const browserHistory = useHistory();

    // Redirect to home page when the authentication signals that the user is already logged in
    React.useEffect(() => {
        if (currentUser) browserHistory.push("/");
    }, [currentUser, browserHistory]);

    // Set successful state variable to false if error occurs
    React.useEffect(() => {
        if (passwordResetError) setPasswordResetSuccessful(false);
    }, [passwordResetError]);

    /**
     * Send password reset link to the user's email using the authentication model (firebase authentication)
     * @param {Event} event
     */
    async function sendPasswordResetLink(event) {
        event.preventDefault(); // Do not reload page on submit

        const email = emailRef.current.value;

        try {
            setIsLoading(true);
            await AuthenticationModel.sendPasswordResetEmail(email);
            setPasswordResetSuccessful(true);
        } catch (error) {
            setPasswordResetError(error);
        }
        setIsLoading(false);
    }

    return (
        <ForgotPasswordView
            onRequestPasswordReset={(e) => sendPasswordResetLink(e)}
            emailRef={emailRef}
            resetRequestWasSuccessful={passwordResetSuccessful}
            error={passwordResetError?.message}
            isLoading={isLoading}
        />
    );
}

export default ForgotPasswordPresenter;
