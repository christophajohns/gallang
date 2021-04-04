import React from "react";
import { HomeView } from "../views";
import { promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { usePromise } from "./customHooks";
import "../types";

/**
 * Presenter for the Home/Browse view
 * @returns Loading spinner or HomeView
 */
function HomePresenter() {
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

    // Effects
    React.useEffect(() => {
        // only at creation
        setCollectionsPromise(CooperHewittSource.getCollections(10));
        setQuotePromise(CooperHewittSource.getQuote());
    }, []);

    React.useEffect(() => {
        // check for valid format when collectionsData is set
        if (collectionsData) checkCollectionsForRequiredFormat(collectionsData);
    }, [collectionsData]);

    const exampleRecentlyViewedImages = [
        {
            id: "18644717",
            url:
                "https://images.collection.cooperhewitt.org/12030_fa96a748c7d67fd9_b.jpg",
            liked: false,
        },
    ];
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
            recentlyViewedImages={exampleRecentlyViewedImages}
            recommendations={exampleRecommendations}
        />
    );

    return (
        promiseNoData(collectionsPromise, collectionsData, collectionsError) ||
        promiseNoData(quotePromise, quoteData, quoteError) ||
        homeView
    );
}

// -- Utility functions --
/**
 * Properties check for collections prop
 * @param {Collection[]} collections - Array of collection objects
 */
function checkCollectionsForRequiredFormat(collections) {
    collections.map((collection) => {
        if (!collection.hasOwnProperty("title"))
            throw Error("Each collection needs a title.");
        if (!collection.hasOwnProperty("images"))
            throw Error("Each collection needs an image property.");
        collection.images.map((image) => {
            if (!image.hasOwnProperty("id"))
                throw Error("Each image in collection needs an ID.");
            if (!image.hasOwnProperty("url"))
                throw Error("Each image in collection needs a URL.");
            if (!image.hasOwnProperty("liked"))
                throw Error("Each image in collection needs a liked.");
            return true;
        });
        return true;
    });
}

export default HomePresenter;
