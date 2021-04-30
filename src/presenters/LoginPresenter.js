import React from "react";
import { LoginView } from "../views";
import { useCurrentUser } from "./customHooks";
import { AuthenticationModel } from "../model";
import { useHistory } from "react-router";

/**
 * Presenter for the login view
 * @returns Login view
 */
function LoginPresenter() {
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null);

    const currentUser = useCurrentUser();

    const browserHistory = useHistory();

    // Redirect to home page when the authentication signals that the user is already logged in
    React.useEffect(() => {
        if (currentUser.auth) browserHistory.push("/");
        // Cleanup on teardown to avoid memory leak
        return () => {
            setIsLoading(false);
            setLoginError(null);
        };
    }, [currentUser, browserHistory]);

    /**
     * Login user using the authentication model (firebase authentication)
     * @param {Event} event
     */
    async function loginUser(event) {
        event.preventDefault(); // Do not reload page on submit

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            setIsLoading(true);
            await AuthenticationModel.signInWithEmailAndPassword(
                email,
                password
            );
            browserHistory.push("/");
        } catch (error) {
            setLoginError(error);
            setIsLoading(false);
        }
    }

    return (
        <LoginView
            emailRef={emailRef}
            passwordRef={passwordRef}
            onRequestLogin={(e) => loginUser(e)}
            isLoading={isLoading}
            error={loginError?.message}
        />
    );
}

export default LoginPresenter;
