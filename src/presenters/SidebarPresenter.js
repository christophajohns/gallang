import React from "react";
import { Sidebar } from "../components";
import { useModelProperty } from "./customHooks";
import { modelType } from "./ImagePresenter";
// eslint-disable-next-line no-unused-vars
import { GallangModel } from "../model"; // only imported for JSDoc type
import { useHistory } from "react-router";
import { HorizontalGridPresenter } from "../presenters";

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
    const [droppedImageID, setDroppedImageID] = React.useState(null);

    const galleryNameRef = React.useRef();

    const likedImageIDs = useModelProperty(model, "likedImageIDs");
    const galleries = useModelProperty(model, "galleries");
    const isCurrentlyDragging = useModelProperty(model, "isCurrentlyDragging");

    const browserHistory = useHistory();

    // focus gallery name input field when modal is displayed
    React.useEffect(() => {
        if (showModal) galleryNameRef.current.focus();
    }, [showModal]);

    /**
     * Create a new gallery with the title specified in the text input field
     * @param {Event} event
     */
    function createGalleryWithImage(event) {
        event.preventDefault();
        const title = galleryNameRef.current.value;
        const imageIDs = droppedImageID ? [droppedImageID] : [];
        const newGalleryID = model.addGallery(title, imageIDs);
        setShowModal(false);
        browserHistory.push(`/gallery/${newGalleryID}`);
    }

    return (
        <Sidebar
            galleriesData={galleries.map((gallery) => ({
                ...gallery,
                images: gallery.imageIDs.map((imageID) => ({
                    id: imageID,
                })),
            }))}
            galleryNameRef={galleryNameRef}
            onClickAddGalleryButton={(e) => setShowModal(true)}
            onRequestCloseModal={(e) => setShowModal(false)}
            onRequestCreateGallery={(e) => createGalleryWithImage(e)}
            expanded={expanded || isCurrentlyDragging}
            showModal={showModal}
            isDropTarget={isCurrentlyDragging}
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
                    onDrop={(imageID) =>
                        model.addImageToGallery(gallery.id, imageID)
                    }
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
                    onDrop={(imageID) => model.likeImage(imageID)}
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
                    onDrop={(imageID) => {
                        setShowModal(true);
                        setDroppedImageID(imageID);
                    }}
                    model={model}
                />
            }
            onClickExpandCollapseButton={(e) => setExpanded(!expanded)}
        />
    );
}

SidebarPresenter.propTypes = {
    model: modelType,
};

export default SidebarPresenter;
