import React from 'react';
import { HomeView } from '../views';
import { promiseNoData } from '../components';
import { CooperHewittSource } from '../model';
import { usePromise } from './customHooks';

function HomePresenter(props) {
    // State
    const [collectionsPromise, setCollectionsPromise] = React.useState(null);
    const [collectionsData, _setCollectionsData, collectionsError, _setCollectionsError] = usePromise(collectionsPromise);

    // Effects
    React.useEffect(() => {
        // only at creation
        setCollectionsPromise(CooperHewittSource.getCollections(10));
    }, []);

    React.useEffect(() => {
        // check for valid format when collectionsData is set
        if (collectionsData) checkCollectionsForRequiredFormat(collectionsData);
    }, [collectionsData])

    // Props
    const {
        model, // Model keeping application state
    } = props;

    const exampleQuote = "Example quote";
    const exampleRecentlyViewedImages = [];
    const exampleRecommendations = [
        {
            title: "Posters",
            images: [],
        },
    ];

    const homeView = (
        <HomeView
            collections={collectionsData}
            quote={exampleQuote}
            recentlyViewedImages={exampleRecentlyViewedImages}
            recommendations={exampleRecommendations}
        />
    );

    return promiseNoData(collectionsPromise, collectionsData, collectionsError) || homeView;
}

// Utility functions
// Properties check for collections prop
function checkCollectionsForRequiredFormat(collections) {
    collections.map(collection => {
        if (!collection.hasOwnProperty("title")) throw Error("Each collection needs a title.");
        if (!collection.hasOwnProperty("images")) throw Error("Each collection needs an image property.");
        collection.images.map(image => {
            if (!image.hasOwnProperty("id")) throw Error("Each image in collection needs an ID.");
            if (!image.hasOwnProperty("url")) throw Error("Each image in collection needs a URL.");
            if (!image.hasOwnProperty("liked")) throw Error("Each image in collection needs a liked.");
            return true;
        });
        return true;
    })
}

export default HomePresenter;