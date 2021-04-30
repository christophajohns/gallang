import React from "react";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";
import { HorizontalGridPresenter } from "../presenters";

function RecommendationPresenter(props) {
    const { model } = props;

    const [recommendationsPromise, setRecommendationsPromise] = React.useState(
        null
    );
    const [recommendationsData, , recommendationsError] = usePromise(
        recommendationsPromise
    );

    React.useEffect(() => {
        // only at creation
        setRecommendationsPromise(model.getRandomRecommendation());
    }, [model]);

    React.useEffect(() => {
        // cleanup at teardown
        return () => {
            setRecommendationsPromise(null);
        };
    }, []);

    return (
        promiseNoData(
            recommendationsPromise,
            recommendationsData,
            recommendationsError
        ) ||
        (!!recommendationsData && (
            <HorizontalGridPresenter
                title={recommendationsData.title}
                images={recommendationsData.images.slice(0, 12)} // only display first 12 images
                description="Recommended for you."
                model={model}
            />
        ))
    );
}

export default RecommendationPresenter;
