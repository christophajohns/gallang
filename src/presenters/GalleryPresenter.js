import { ResultsPresenter } from "../presenters";
import { useParams, useHistory } from "react-router-dom";
import { useModelProperty } from "./customHooks";
import { modelType as imagePresenterModelType } from "./ImagePresenter";

/**
 * Presenter for the gallery page content.
 * @param {GallangModel} props.model - Model keeping the application state
 */
function GalleryPresenter(props) {
    const { model } = props;

    const browserHistory = useHistory();
    const { galleryID } = useParams();
    const galleries = useModelProperty(model, "galleries");
    const gallery = galleries.find(
        (currentGallery) => currentGallery.id === galleryID
    );

    // Creating a new gallery seems to cause issues when updating the component
    // To address this, we do an early return if the component gets updated before the gallery was added
    if (!gallery) return false;
    
    function removeGalleryAndRedirectToHome() {
        model.removeGallery(galleryID);
        browserHistory.push("/");
    }

    return (
        <ResultsPresenter
            contentType="gallery"
            title={gallery.title}
            numberOfObjects={gallery.imageIDs.length}
            images={gallery.imageIDs.map((imageID) => ({
                id: imageID,
                removeImage: (e) =>
                    model.removeImageFromGallery(imageID, galleryID),
            }))}
            imagesAreRemovable={true}
            allowDelete={true}
            handleDelete={(e) => removeGalleryAndRedirectToHome()}
            model={model}
        />
    );
}

GalleryPresenter.propTypes = {
    model: imagePresenterModelType.isRequired,
};

export default GalleryPresenter;
