import React, {Fragment} from 'react';
import { useParams, useLocation } from "react-router-dom";
import { DetailsView } from "../views";
import { CooperHewittSource } from "../model";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";


function DetailsPresenter(props) {
    const { imageID } = useParams();

    // const image_title = object.title;
    // const image_id = object.images[0].b.image_id;
    // const image_src = object.images[0].b.url;
    // const image_label_text = object.label_text;
    const [promise, setPromise] = React.useState(null);

    // Effects
    React.useEffect(()=> {
        setPromise(CooperHewittSource.getObjectInfo(imageID));
    }, []);

    const [data, setData, error, setError] = usePromise(promise);

    return (
        <Fragment>
            { promiseNoData(promise,data,error) || (
                <DetailsView 
                    id={data.id}
                    images={data.images}
                    title={data.title}
                    description={data.description}
                />
            )}
        </Fragment>
    );
}

export default DetailsPresenter;