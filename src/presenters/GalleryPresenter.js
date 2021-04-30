import PropTypes from "prop-types";
import { ResultsPresenter } from "../presenters";
import { useParams } from "react-router-dom";
import { useModelProperty } from "./customHooks";
import { imageType } from "../types";
import { modelType as imagePresenterModelType } from "./ImagePresenter";

/**
 * Presenter for the gallery page content.
 * @param {GallangModel} props.model - Model keeping the application state
 */
function GalleryPresenter(props) {
    const { model } = props;

    const { galleryID } = useParams();
    const gallery = useModelProperty(model, "galleries").find((e) => e.id == galleryID);

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
    model: imagePresenterModelType.isRequired
};

export default GalleryPresenter;
