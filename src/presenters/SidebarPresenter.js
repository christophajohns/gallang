import React from "react";
import { Sidebar } from "../components";
import { useModelProperty } from "./customHooks";
import { modelType } from "./ImagePresenter";

/**
 * Presenter for the Sidebar component
 * @param {Object} props - Properties to be passed to the view
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 * @returns Sidebar component
 */
function SidebarPresenter(props) {
    const { model } = props;

    const [expanded, setExpanded] = React.useState(false);
    const likedImageIDs = useModelProperty(model, "likedImageIDs");

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
            likedImages={likedImageIDs.map((imageID) => ({
                id: imageID,
            }))}
            model={model}
        />
    );
}

Sidebar.propTypes = {
    model: modelType,
};

export default SidebarPresenter;
