import React from "react";
import { TopNav } from "../components";

/**
 * Presenter for the TopNav component
 * @returns TopNav component
 */
function TopNavPresenter() {
    const accountOptionsRef = React.useRef(null); // used to enable the mouse enter/leave behaviour

    /** Show the account options for the currently logged in user (e.g. My account, Logout) */
    function showAccountOptions() {
        accountOptionsRef.current.classList.remove("hidden");
    }

    /** Show the account options for the currently logged in user (e.g. My account, Logout) */
    function hideAccountOptions() {
        accountOptionsRef.current.classList.add("hidden");
    }

    return (
        <TopNav
            username="GallangUser"
            isLoggedIn={true}
            onAccountWrapperMouseEnter={(e) => showAccountOptions()}
            onAccountOptionsMouseLeave={(e) => hideAccountOptions()}
            accountOptionsRef={accountOptionsRef}
        />
    );
}

export default TopNavPresenter;
