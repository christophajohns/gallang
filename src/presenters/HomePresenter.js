import React from "react";
import { HomeView } from "../views";
import { promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { usePromise } from "./customHooks";
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

    // Effects
    React.useEffect(() => {
        // only at creation
        setCollectionsPromise(CooperHewittSource.getCollections(10));
        setQuotePromise(CooperHewittSource.getQuote());
    }, []);

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
