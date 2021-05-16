import React from "react";
import { useHistory } from "react-router-dom";
import { SignupView } from "../views";
// eslint-disable-next-line no-unused-vars
import { GallangModel } from "../model"; // only imported for JSDoc type
import { useModelProperty } from "./customHooks";

/**
 * Presenter for the signup view
 * @param {Object} props - Properties passed to the presenter
 * @param {GallangModel} props.model - Model keeping the application state
 * @returns Signup view
 */
function SignupPresenter(props) {
    const { model } = props;

    const usernameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const confirmPasswordRef = React.useRef(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [signupError, setSignupError] = React.useState(null);

    const browserHistory = useHistory();
    const currentUser = useModelProperty(model, "currentUser");

    // Redirect to home page when the authentication signals that the user is already logged in
    React.useEffect(() => {
        if (currentUser) browserHistory.push("/");
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
            await model.createUserWithEmailAndPassword(email, password);
            await model.updateUserName(username);
            browserHistory.push("/");
        } catch (error) {
            setSignupError(error);
            setIsLoading(false);
        }
    }
    function onChangePasswordField(event){
        event.preventDefault(); // Do not reload page on submit
        const password = passwordRef.current.value;
        const regEx = /^.{6,}$/;
        const passwordValid = regEx.test(password);
        if (!passwordValid && password) {
            const error = Error(
                "Password needs to be at least 6 characters"
            );
            setSignupError(error);
            return;
        }else{
            setSignupError(null);
            return;
        };
    }

    return (
        <SignupView
            usernameRef={usernameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            onChangePasswordField={(e)=>onChangePasswordField(e)}
            confirmPasswordRef={confirmPasswordRef}
            onRequestSignup={(e) => signupUser(e)}
            isLoading={isLoading}
            error={signupError?.message}
        />
    );
}

export default SignupPresenter;
