import React from "react";
import { Sidebar } from "../components";

/**
 * Presenter for the Sidebar component
 * @returns Sidebar component
 */
function SidebarPresenter() {
    const [expanded, setExpanded] = React.useState(false);

    // Placeholder galleries for now
    const galleries = [
        {
            title: "Dark and Moody",
            id: "12345",
            images: [],
        },
        {
            title: "Happy and Cheerful",
            id: "12346",
            images: [],
        },
        {
            title: "Almost Disgusting (but in a fun way)",
            id: "12347",
            images: [],
        },
    ];

    /** Redirect user to search results page using the query specified in the search input field */
    function addGallery() {
        console.log("Add gallery requested");
    }

    return (
        <Sidebar
            galleries={galleries}
            onClickAddGallery={(e) => addGallery()}
            expanded={expanded}
            onClickExpandCollapseButton={(e) => setExpanded(!expanded)}
        />
    );
}

export default SidebarPresenter;
