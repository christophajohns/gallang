import React from "react";
import _ from "underscore";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";
import { HorizontalGridPresenter } from "../presenters";

function RecommendationPresenter(props) {
    const { title, images, model } = props;

    const [recommendationsPromise, setRecommendationsPromise] = React.useState(
        null
    );
    const [recommendationsData, , recommendationsError] = usePromise(
        recommendationsPromise
    );

    React.useEffect(() => {
        // only at creation
        const recommendationBases = ["type", "medium", "person"];
        const randomRecommendationBasis = _.sample(recommendationBases);
        if (!title && !images) {
            setRecommendationsPromise(
                model.getRecommendation(randomRecommendationBasis)
            );
        }
    }, [model, title, images]);

    return (
        promiseNoData(
            recommendationsPromise,
            recommendationsData,
            recommendationsError
        ) ||
        (!!recommendationsData.images.length && (
            <HorizontalGridPresenter
                title={recommendationsData.title}
                images={recommendationsData.images}
                description="Recommended for you."
                model={model}
            />
        ))
    );
}

export default RecommendationPresenter;
