import React from "react";
import _ from "underscore";
import { TopNav } from "../components";

/**
 * Presenter for the TopNav component
 * @returns TopNav component
 */
function TopNavPresenter() {
    const accountOptionsRef = React.useRef(null); // used to enable the mouse enter/leave behaviour
    const [query, setQuery] = React.useState("");

    // Make a (debounced) search request when query changes
    React.useEffect(() => {
        if (query !== "") redirectToSearchResults();
    }, [query]);

    /** Show the account options for the currently logged in user (e.g. My account, Logout) */
    function showAccountOptions() {
        accountOptionsRef.current.classList.remove("hidden");
    }

    /** Hide the account options for the currently logged in user (e.g. My account, Logout) */
    function hideAccountOptions() {
        accountOptionsRef.current.classList.add("hidden");
    }

    /** Redirect user to search results page using the query specified in the search input field */
    function redirectToSearchResults() {
        const urlSearchParams = new URLSearchParams({ query });
        const redirectURL = "/search" + urlSearchParams;
        console.log("Would redirect to ", redirectURL);
        // browserHistory.push(redirectURL);
    }

    /** Redirect user to search results page using the query specified in the search input field */
    function updateQueryInState(event) {
        const updatedQuery = event.target.value; // Text value of the search input field
        setQuery(updatedQuery);
    }

    return (
        <TopNav
            username="GallangUser"
            isLoggedIn={true}
            onAccountWrapperMouseEnter={(e) => showAccountOptions()}
            onAccountOptionsMouseLeave={(e) => hideAccountOptions()}
            accountOptionsRef={accountOptionsRef}
            onSearchInput={_.debounce(updateQueryInState, 500)}
            onSearch={(e) => redirectToSearchResults()}
        />
    );
}

export default TopNavPresenter;
