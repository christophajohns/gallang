import React from "react";
import _ from "underscore";
import { useHistory } from "react-router-dom";
import { TopNav } from "../components";
// eslint-disable-next-line no-unused-vars
import { GallangModel } from "../model"; // only imported for JSDoc type
import { useModelProperty } from "./customHooks";

/**
 * Presenter for the TopNav component
 * @param {Object} props - Properties passed to the presenter
 * @param {GallangModel} props.model - Model keeping the application state
 * @returns TopNav component
 */
function TopNavPresenter(props) {
    const { model } = props;
    const accountOptionsRef = React.useRef(null); // used to enable the mouse enter/leave behaviour
    const [query, setQuery] = React.useState("");

    const browserHistory = useHistory(); // used to manually navigate/redirect to the details of a specific image
    const currentUser = useModelProperty(model, "currentUser");

    /** Redirect user to search results page using the query specified in the search input field */
    const redirectToSearchResults = React.useCallback(() => {
        // useCallback memoizes the function making it available to pass to useEffect
        if (query === "") return;
        const urlSearchParams = new URLSearchParams({ query });
        const redirectURL = "/search?" + urlSearchParams;
        browserHistory.push(redirectURL);
    }, [query, browserHistory]);

    // Make a (debounced) search request when query changes
    React.useEffect(() => {
        if (query !== "") redirectToSearchResults();
    }, [query, redirectToSearchResults]);

    /** Show the account options for the currently logged in user (e.g. My account, Logout) */
    function showAccountOptions() {
        accountOptionsRef.current.classList.remove("hidden");
    }

    /** Hide the account options for the currently logged in user (e.g. My account, Logout) */
    function hideAccountOptions() {
        accountOptionsRef.current.classList.add("hidden");
    }

    /**
     * Redirect user to search results page using the query specified in the search input field
     * @param {Event} event
     */
    function updateQueryInState(event) {
        const updatedQuery = event.target.value; // Text value of the search input field
        setQuery(updatedQuery);
    }

    /** Redirect user to profile page */
    function redirectToProfile() {
        browserHistory.push(`/profile`);
    }

    /**
     * Logout user using the authentication model (firebase authentication)
     * @param {Event} event
     */
    async function logoutUser(event) {
        try {
            await model.signOut();
            browserHistory.push("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TopNav
            isLoggedIn={!!currentUser}
            username={currentUser ? currentUser.displayName : null}
            onAccountWrapperMouseEnter={showAccountOptions}
            onAccountOptionsMouseLeave={hideAccountOptions}
            accountOptionsRef={accountOptionsRef}
            onSearchInput={_.debounce(updateQueryInState, 500)}
            onSearch={redirectToSearchResults}
            onLogoutRequest={logoutUser}
            onClickMyAccountButton={redirectToProfile}
        />
    );
}

export default TopNavPresenter;
