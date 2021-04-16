import React from "react";
import { Sidebar } from "../components";

/**
 * Presenter for the Sidebar component
 * @returns Sidebar component
 */
function SidebarPresenter() {
    const galleries = [];

    /** Redirect user to search results page using the query specified in the search input field */
    function addGallery() {
        console.log("Add gallery requested");
    }

    return (
        <Sidebar
            galleries={galleries}
            onClickAddGallery={(e) => addGallery()}
        />
    );
}

export default SidebarPresenter;
