import { ResultsPresenter } from "../presenters";
import { useParams } from "react-router-dom";
import { useModelProperty } from "./customHooks";
import { modelType as imagePresenterModelType } from "./ImagePresenter";

/**
 * Presenter for the gallery page content.
 * @param {GallangModel} props.model - Model keeping the application state
 */
function GalleryPresenter(props) {
    const { model } = props;

    const { galleryID } = useParams();
    const galleries = useModelProperty(model, "galleries");
    const gallery = galleries.find(
        (currentGallery) => currentGallery.id === galleryID
    );

    // Creating a new gallery seems to cause issues when updating the component
    // To address this, we do an early return if the component gets updated before the gallery was added
    if (!gallery) return false;

    return (
        <ResultsPresenter
            contentType="gallery"
            title={gallery.title}
            numberOfObjects={gallery.imageIDs.length}
            images={gallery.imageIDs.map((imageID) => ({ id: imageID }))}
            model={model}
        />
    );
}

GalleryPresenter.propTypes = {
    model: imagePresenterModelType.isRequired,
};

export default GalleryPresenter;
