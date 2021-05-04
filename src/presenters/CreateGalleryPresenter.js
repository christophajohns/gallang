import React from "react";
import PropTypes from "prop-types";
import CreateGalleryView from "../views/CreateGalleryView";
import { useModelProperty } from "./customHooks";
import { useHistory } from "react-router";

function CreateGalleryPresenter(props){
    const {
        model,
        imageID = null, //the image ID from a drag and drop to new gallery
    } = props;

    const galleryNameRef = React.useRef(null);

    const browserHistory = useHistory();

    //redirect user to new gallery after creation
    function redirectToNewGallery(newGalleryID){
        browserHistory.push(`/gallery/${newGalleryID}`);
    }

    //creates the new gallery with the specified name
    function createGallery(event){
        event.preventDefault(); // Do not reload page on submit

        const galleryname = galleryNameRef.current.value;
        const newGalleryID = model.addGallery(galleryname, imageID);
    
        //if the user triggered the presenter by dropping an image into the sidebar, add image to the new gallery
        //console.log(imageID);
        //model.addImageToGallery(imageID,)

        redirectToNewGallery(newGalleryID);
    }
    
    return (
        <CreateGalleryView 
            onRequestCreateGallery={(e)=>createGallery(e)} 
            galleryNameRef={galleryNameRef}
            isLoading={false}
            error={""}
        />
    )
}

export default CreateGalleryPresenter;