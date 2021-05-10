import React from "react";
import { CollectionCarousel, promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { usePromise } from "./customHooks";
import "../types";

/**
 * Presenter for a the collection carousel
 * @returns Loading spinner or CollectionCarousel
 */
function CollectionCarouselPresenter() {
    const [periodsPromise, setPeriodsPromise] = React.useState(null);
    const [periodsData, , periodsError] = usePromise(periodsPromise);

    React.useEffect(() => {
        // only at creation
        setPeriodsPromise(CooperHewittSource.getPeriods(4));
        return () => {
            // cleanup on teardown
            setPeriodsPromise(null);
        };
    }, []);

    return (
        promiseNoData(periodsPromise, periodsData, periodsError) || (
            <CollectionCarousel collections={periodsData} />
        )
    );
}

export default CollectionCarouselPresenter;
