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

   //const galleries = model.galleries();
   // console.log(galleries);

    // const createGallery = (e) => model.addGallery(e);

    //redirect user to new gallery after creation
    /*function redirectToNewGallery(newGalleryID){
        browserHistory.push(`/gallery/${newGalleryID}`);
    }
    */
  

    function createGallery(event){
        event.preventDefault(); // Do not reload page on submit

        const galleryname = galleryNameRef.current.value;
        console.log(galleryname);
        const newGalleryID = model.addGallery(galleryname);
        //get the gallery id from model
       
        //const gallery = galleries[galleries.length - 1];
        //console.log(gallery);
        //browserHistory.push(`/gallery/${gallery.id}`);
        console.log(newGalleryID);
        ///redirectToNewGallery(newGalleryID);
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