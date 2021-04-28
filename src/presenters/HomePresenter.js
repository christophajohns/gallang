import React from "react";
import { HomeView } from "../views";
import { promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { usePromise, useModelProperty } from "./customHooks";
import { RecommendationPresenter } from "../presenters";
import "../types";

/**
 * Presenter for the Home/Browse view
 * @param {GallangModel} props.model - The model holding the application state
 * @returns Loading spinner or HomeView
 */
function HomePresenter(props) {
    const {
        model, // The model holding the application state
    } = props;

    // State
    // Collections
    const [collectionsPromise, setCollectionsPromise] = React.useState(null);
    const collectionsPromiseStatesAndSetters = usePromise(collectionsPromise);
    const collectionsData = collectionsPromiseStatesAndSetters[0];
    const collectionsError = collectionsPromiseStatesAndSetters[2];
    // Quote
    const [quotePromise, setQuotePromise] = React.useState(null);
    const quotePromiseStatesAndSetters = usePromise(quotePromise);
    const quoteData = quotePromiseStatesAndSetters[0];
    const quoteError = quotePromiseStatesAndSetters[2];
    // Liked images
    const likedImageIDs = useModelProperty(model, "likedImageIDs");
    // Recently viewed images
    const recentlyViewedImages = useModelProperty(
        model,
        "recentlyViewedImages"
    );

    // Effects
    React.useEffect(() => {
        // only at creation
        setCollectionsPromise(CooperHewittSource.getCollections(10));
        setQuotePromise(CooperHewittSource.getQuote());
    }, [model]);

    const numberOfRecommendations = 3;

    let recommendations = [];
    // Only render recommendations if user has liked some images
    if (likedImageIDs.length >= 3) {
        for (let index = 0; index < numberOfRecommendations; index++) {
            let recommendationProps = {
                key: index,
                model: model,
            };
            if (index < model.currentRecommendations.length) {
                const recommendationData = model.currentRecommendations[index];
                recommendationProps = {
                    ...recommendationProps,
                    title: recommendationData.title,
                    images: recommendationData.images,
                };
            }
            const recommendation = (
                <RecommendationPresenter {...recommendationProps} />
            );
            recommendations.push(recommendation);
        }
    }

    const homeView = (
        <HomeView
            collections={collectionsData}
            quote={quoteData}
            recommendations={recommendations.length ? recommendations : null}
            recentlyViewedImages={recentlyViewedImages.slice(0, 12)} // Only render latest 12 images
            model={model}
        />
    );

    return (
        promiseNoData(collectionsPromise, collectionsData, collectionsError) ||
        promiseNoData(quotePromise, quoteData, quoteError) ||
        homeView
    );
}

export default HomePresenter;
