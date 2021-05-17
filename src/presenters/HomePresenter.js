import React from "react";
import { HomeView } from "../views";
import { promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { usePromise, useModelProperty } from "./customHooks";
import { RecommendationPresenter, HorizontalGridPresenter } from "../presenters";
import "../types";
import { CollectionCarouselPresenter, PeriodPresenter } from ".";

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
    const [collectionsData, , collectionsError] = usePromise(
        collectionsPromise
    );
    // Quote
    const [quotePromise, setQuotePromise] = React.useState(null);
    const [quoteData, , quoteError] = usePromise(quotePromise);
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
        setCollectionsPromise(CooperHewittSource.getPeriodsList(2, 4));
        setQuotePromise(CooperHewittSource.getQuote());
    }, [model]);

    React.useEffect(() => {
        // cleanup on teardown
        return () => {
            setCollectionsPromise(null);
            setQuotePromise(null);
        };
    }, []);

    /**
     * Utility function to
     * @param {number} [numberOfRecommendations = 3] - Number of recommendations to render in home view
     * @returns - Array of RecommendationPresenters to pass as prop
     */
    function getRecommendationPresenters(numberOfRecommendations = 3) {
        // make sure that a fresh set of recommendations is computed every time the home page is opened
        model.resetCurrentRecommendations();

        let recommendations = [];

        // Only render recommendations if user has liked some images
        const minimumNumberOfLikedImages = 3; // user has to have liked at least this many images
        if (likedImageIDs.length >= minimumNumberOfLikedImages) {
            // Create as many recommendation presenters as specified
            for (let index = 0; index < numberOfRecommendations; index++) {
                // Add recommendation presenter to recommendations array
                const recommendation = (
                    <RecommendationPresenter key={index} model={model} />
                );
                recommendations.push(recommendation);
            }
        }

        return recommendations;
    }

    const recommendations = getRecommendationPresenters(3);

    const homeView = (
        <HomeView
            collections={collectionsData?.map((collection) => (
                <PeriodPresenter
                    key={collection.id}
                    title={collection.name}
                    id={collection.id}
                    model={model}
                />
            ))}
            quote={quoteData}
            recommendations={recommendations.length ? recommendations : null}
            carousel={<CollectionCarouselPresenter />}
            recentlyViewedImages={
                recentlyViewedImages.length > 0 && (
                    <HorizontalGridPresenter
                        title="Recently viewed"
                        images={recentlyViewedImages.slice(0, 12)} // Only render latest 12 images
                        model={model}
                    />
                )
            }
           
        />
    );

    return (
        promiseNoData(collectionsPromise, collectionsData, collectionsError) ||
        promiseNoData(quotePromise, quoteData, quoteError) ||
        homeView
    );
}

export default HomePresenter;
