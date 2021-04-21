import React from "react";
import _ from "underscore";
import { promiseNoData, Recommendation } from "../components";
import { usePromise } from "./customHooks";

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

    if (title && images && images.length) {
        return <Recommendation title={title} images={images} model={model} />;
    }

    return (
        promiseNoData(
            recommendationsPromise,
            recommendationsData,
            recommendationsError
        ) ||
        (!!recommendationsData.images.length && (
            <Recommendation
                title={recommendationsData.title}
                images={recommendationsData.images}
                model={model}
            />
        ))
    );
}

export default RecommendationPresenter;
