import React from "react";
import { HomeView } from "../views";
import { promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { useModelProperty, usePromise } from "./customHooks";
import "../types";
import { PeriodPresenter } from ".";

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
    // Recently viewed images
    const recentlyViewedImages = useModelProperty(
        model,
        "recentlyViewedImages"
    );

    // Effects
    React.useEffect(() => {
        // only at creation
        setCollectionsPromise(CooperHewittSource.getPeriods(7));
        setQuotePromise(CooperHewittSource.getQuote());
        return () => {
            // cleanup on teardown
            setCollectionsPromise(null);
            setQuotePromise(null);
        };
    }, []);

    const exampleRecommendations = [
        {
            title: "Posters",
            images: [
                {
                    id: "18645651",
                    url:
                        "https://images.collection.cooperhewitt.org/223579_b1374fa355c2fb77_b.jpg",
                    liked: true,
                },
                {
                    id: "2318797273",
                    url:
                        "https://images.collection.cooperhewitt.org/348036_88262b84479c8e3d_b.jpg",
                    liked: true,
                },
            ],
        },
    ];

    const homeView = (
        <HomeView
            collections={collectionsData}
            quote={quoteData}
            recentlyViewedImages={recentlyViewedImages.slice(0, 12)} // Only render latest 12 images
            recommendations={exampleRecommendations}
            periods={
                collectionsData &&
                collectionsData
                    .slice(4, 6)
                    .map((collection) => (
                        <PeriodPresenter
                            key={collection.id}
                            title={collection.title}
                            id={collection.id}
                            model={model}
                        />
                    ))
            }
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
