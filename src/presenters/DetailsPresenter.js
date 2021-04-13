import React, {Fragment} from 'react';
import { useParams, useHistory } from "react-router-dom";
import { DetailsView } from "../views";
import { CooperHewittSource } from "../model";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";
import { useModelProperty } from "./customHooks";


function DetailsPresenter(props) {
    const { imageID } = useParams();
    const { model } = props;
    const likedImageIDs = useModelProperty(model, "likedImageIDs");

    const [promise, setPromise] = React.useState(null);

    // Effects
    React.useEffect(()=> {
        setPromise(CooperHewittSource.getObjectInfo(imageID));
    }, []);

    const [data, setData, error, setError] = usePromise(promise);

    const browserHistory = useHistory();
    function redirectToHome() {
        browserHistory.push(`/`);
    }

    return (
        <Fragment>
            { promiseNoData(promise,data,error) || (
                <DetailsView 
                    id={data.id}
                    images={data.images}
                    title={data.title}
                    description={data.description}
                    liked={likedImageIDs.includes(data.id)}
                    onClickUnlikeButton={(e)=>model.unlikeImage(data.id)}
                    onClickLikeButton={(e)=>model.likeImage(data.id)}
                    onClickReturn={(e)=>redirectToHome()}
                />
            )}
        </Fragment>
    );
}

export default DetailsPresenter;