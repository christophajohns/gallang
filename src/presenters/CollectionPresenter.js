import React from "react";
import { ResultsPresenter } from "../presenters";
import { promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { modelType as imagePresenterModelType } from "./ImagePresenter";
import { usePromise } from "./customHooks";
import { useParams } from "react-router-dom";

/**
 * Presenter for the collection page content.
 * @param {string} props.title - Title or name for the collection
 * @param {number} props.numberOfObjects - Total number of objects in the collection to be displayed
 * @param {Image[]} props.images - Array of images to render in the grid
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function CollectionPresenter(props) {
    const { model } = props;

    const params = useParams();
    const periodID = params.collectionID;
    console.log(periodID);

    const [periodPromise, setPeriodPromise] = React.useState(null);
    const [periodData, , periodError] = usePromise(periodPromise);

    React.useEffect(() => {
        // only at creation
        setPeriodPromise(CooperHewittSource.getPeriod(periodID));
        return () => {
            // cleanup on teardown
            setPeriodPromise(null);
        };
    }, []);
    console.log(periodData);

    return (
        promiseNoData(periodPromise, periodData, periodError) || (
            <ResultsPresenter
            contentType="collection"
            title={periodData.name}
            numberOfObjects={periodData.images.length}
            images={periodData.images}
            allowDownloadAll={false}
            model={model}
        />
        )
    );
}

CollectionPresenter.propTypes = {
    model: imagePresenterModelType,
};

export default CollectionPresenter;
