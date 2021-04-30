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

   // const galleries = useModelProperty(model, "galleries");
    //console.log(galleries);
    const { galleryID } = useParams();
    const gallery = useModelProperty(model, "galleries").find((e) => e.id==galleryID);
    console.log(gallery);
    console.log(gallery.imageIDs);

    return (
        <ResultsPresenter
            contentType="gallery"
            title={gallery.title}
            numberOfObjects={gallery.imageIDs.length}
            images={[]}//has to be changed to the image objects somehow..
            model={model}
        />
    );
}

GalleryPresenter.propTypes = {
    model: imagePresenterModelType.isRequired
};

export default GalleryPresenter;
