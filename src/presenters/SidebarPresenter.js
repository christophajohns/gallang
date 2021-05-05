import React from "react";
import { Sidebar } from "../components";
import { useModelProperty } from "./customHooks";
import { modelType } from "./ImagePresenter";
import { HorizontalGridPresenter } from "../presenters";

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
            galleriesData={galleries.map((gallery) => ({
                ...gallery,
                images: gallery.imageIDs.map((imageID) => ({
                    id: imageID,
                })),
            }))}
            galleries={galleries.map((gallery) => (
                <HorizontalGridPresenter
                    key={gallery.id}
                    id={gallery.id}
                    type="gallery"
                    href={`/gallery/${gallery.id}`}
                    title={gallery.title}
                    images={gallery.imageIDs.map((imageID) => ({
                        id: imageID,
                    }))}
                    small={true}
                    emptyStateText={"Drag here to add to gallery"}
                    isDropTarget={isCurrentlyDragging}
                    imagesAreRemovable={true}
                    model={model}
                />
            ))}
            likedContent={
                <HorizontalGridPresenter
                    id="likedContent"
                    title="Liked content"
                    href="/liked"
                    images={likedImageIDs.map((imageID) => ({
                        id: imageID,
                    }))}
                    model={model}
                    small={true}
                    emptyStateText={"Click on the heart icon to like an image"}
                    isDropTarget={isCurrentlyDragging}
                    imagesAreRemovable={true}
                />
            }
            newGallery={
                <HorizontalGridPresenter
                    id="newGallery"
                    type="gallery"
                    title="New Gallery"
                    images={[]}
                    small={true}
                    emptyStateText={"Drag here to create a new gallery"}
                    isDropTarget={isCurrentlyDragging}
                    model={model}
                />
            }
            onClickAddGallery={(e) => addGallery("Example Gallery")}
            expanded={expanded || isCurrentlyDragging}
            onClickExpandCollapseButton={(e) => setExpanded(!expanded)}
        />
    );
}

SidebarPresenter.propTypes = {
    model: modelType,
};

export default SidebarPresenter;
