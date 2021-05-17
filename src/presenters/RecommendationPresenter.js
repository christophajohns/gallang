import React from "react";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";
import { HorizontalGridPresenter } from "../presenters";
// eslint-disable-next-line no-unused-vars
import { GallangModel } from "../model"; // only imported for JSDoc type

/**
 * Presenter for a horizontal grid of recommended images
 * @param {Object} props - Properties passed to the presenter
 * @param {GallangModel} props.model - Model keeping the application state
 */
function RecommendationPresenter(props) {
    const { model } = props;

    const [recommendationsPromise, setRecommendationsPromise] =
        React.useState(null);
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
