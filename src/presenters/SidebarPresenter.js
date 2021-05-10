import React from "react";
import { Sidebar } from "../components";
import { useModelProperty } from "./customHooks";
import { modelType } from "./ImagePresenter";
// eslint-disable-next-line no-unused-vars
import { GallangModel } from "../model"; // only imported for JSDoc type
import { useHistory } from "react-router";

/**
 * Presenter for the Sidebar component
 * @param {Object} props - Properties to be passed to the view
 * @param {GallangModel} props.model - Model keeping the application state
 * @returns Sidebar component
 */
function SidebarPresenter(props) {
    const { model } = props;

    const [expanded, setExpanded] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const galleryNameRef = React.useRef();

    const likedImageIDs = useModelProperty(model, "likedImageIDs");
    const galleries = useModelProperty(model, "galleries");
    const isCurrentlyDragging = useModelProperty(model, "isCurrentlyDragging");

    const browserHistory = useHistory();

    /**
     * Create a new gallery with the title specified in the text input field
     */
    function addGallery() {
        const title = galleryNameRef.current.value;
        const newGalleryID = model.addGallery(title);
        browserHistory.push(`/gallery/${newGalleryID}`);
    }

    return (
        <Sidebar
            galleries={galleries.map((gallery) => ({
                ...gallery,
                images: gallery.imageIDs.map((imageID) => ({ id: imageID })),
            }))}
            galleryNameRef={galleryNameRef}
            onClickAddGalleryButton={(e) => setShowModal(true)}
            onRequestCloseModal={(e) => setShowModal(false)}
            onRequestCreateGallery={(e) => addGallery()}
            expanded={expanded || isCurrentlyDragging}
            showModal={showModal}
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
