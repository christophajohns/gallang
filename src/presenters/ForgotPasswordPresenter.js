import React from "react";
import { useHistory } from "react-router";
import { ForgotPasswordView } from "../views";
import { useModelProperty } from "./customHooks";
// eslint-disable-next-line no-unused-vars
import { GallangModel } from "../model"; // only imported for JSDoc type

/**
 * Presenter for the forgot password view
 * @param {Object} props - Properties passed to the presenter
 * @param {GallangModel} props.model - Model keeping the application state
 * @returns Forgot password view
 */
function ForgotPasswordPresenter(props) {
    const { model } = props;
    const emailRef = React.useRef(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [passwordResetError, setPasswordResetError] = React.useState(null);
    const [
        passwordResetSuccessful,
        setPasswordResetSuccessful,
    ] = React.useState(null);

    const currentUser = useModelProperty(model, "currentUser");
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
            await model.sendPasswordResetEmail(email);
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
