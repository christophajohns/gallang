import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { DetailsView } from "../views";
import { CooperHewittSource } from "../model";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";
import { useModelProperty } from "./customHooks";
import { modelType as imagePresenterModelType } from "./ImagePresenter";

/**
 * Presenter for the details page content (larger display of an image).
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function DetailsPresenter(props) {
    const { model } = props;

    // Hooks
    const likedImageIDs = useModelProperty(model, "likedImageIDs");

    const [objectInfoPromise, setPromise] = React.useState(null);
    const [objectInfoData, , objectInfoError] = usePromise(objectInfoPromise);

    const { imageID } = useParams();
    const browserHistory = useHistory();

    // Effects
    React.useEffect(() => {
        setPromise(CooperHewittSource.getObjectInfo(imageID));
    }, [imageID]);

    /** Redirect user to home page ("/") when a user clicks on the return button */
    function redirectToHome() {
        browserHistory.push(`/`);
    }

    return (
        <>
            {promiseNoData(
                objectInfoPromise,
                objectInfoData,
                objectInfoError
            ) || (
                <DetailsView
                    id={objectInfoData.id}
                    title={objectInfoData.title}
                    url={objectInfoData.images[0].b.url}
                    description={objectInfoData.description}
                    liked={likedImageIDs.includes(objectInfoData.id)}
                    onClickUnlikeButton={(e) =>
                        model.unlikeImage(objectInfoData.id)
                    }
                    onClickLikeButton={(e) =>
                        model.likeImage(objectInfoData.id)
                    }
                    onClickClose={(e) => redirectToHome()}
                />
            )}
        </>
    );
}

DetailsPresenter.propTypes = {
    model: imagePresenterModelType,
};

export default DetailsPresenter;
