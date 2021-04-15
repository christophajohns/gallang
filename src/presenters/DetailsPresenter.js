import React, { Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { DetailsView } from "../views";
import { CooperHewittSource } from "../model";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";
import { useModelProperty } from "./customHooks";
import { modelType } from "./ImagePresenter";

/**
 * Presenter for the details page content (larger display of an image).
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function DetailsPresenter(props) {
    const { imageID } = useParams();
    const { model } = props;
    const likedImageIDs = useModelProperty(model, "likedImageIDs");

    const [promise, setPromise] = React.useState(null);

    // Effects
    React.useEffect(() => {
        setPromise(CooperHewittSource.getObjectInfo(imageID));
    }, [imageID]);

    const [data, , error] = usePromise(promise);

    const browserHistory = useHistory();
    function redirectToHome() {
        browserHistory.push(`/`);
    }

    return (
        <Fragment>
            {promiseNoData(promise, data, error) || (
                <DetailsView
                    id={data.id}
                    images={data.images}
                    title={data.title}
                    url={data.url}
                    description={data.description}
                    liked={likedImageIDs.includes(data.id)}
                    onClickUnlikeButton={(e) => model.unlikeImage(data.id)}
                    onClickLikeButton={(e) => model.likeImage(data.id)}
                    onClickReturn={(e) => redirectToHome()}
                />
            )}
        </Fragment>
    );
}

DetailsPresenter.propTypes = {
    model: modelType,
};

export default DetailsPresenter;
