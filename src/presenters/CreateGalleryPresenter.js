import PropTypes from "prop-types";
import CreateGalleryView from "../views/CreateGalleryView";

function CreateGalleryPresenter(props){
    const {
        model,
    } = props;
    return (
        <CreateGalleryView model={model}/>
    )
}

export default CreateGalleryPresenter;