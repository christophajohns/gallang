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
    const galleries = useModelProperty(model, "galleries");
    const isCurrentlyDragging = useModelProperty(model, "isCurrentlyDragging");

    /**
     * Create a new gallery with the specified title
     * @param {string} title - Title or name for the new gallery
     */
    function addGallery(title) {
        console.log(`Add gallery ${title} requested`);
    }

    return (
        <Sidebar
            galleries={galleries.map((gallery) => ({
                ...gallery,
                images: gallery.imageIDs.map((imageID) => ({ id: imageID })),
            }))}
            onClickAddGallery={(e) => addGallery("Example Gallery")}
            expanded={expanded || isCurrentlyDragging}
            isDropTarget={isCurrentlyDragging}
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
