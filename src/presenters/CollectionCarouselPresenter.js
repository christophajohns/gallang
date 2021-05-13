import React from "react";
import { useHistory } from "react-router-dom";
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

    const browserHistory = useHistory(); // used to manually navigate/redirect to the details of a specific image

    React.useEffect(() => {
        // only at creation
        setPeriodsPromise(CooperHewittSource.getPeriods(4));
        return () => {
            // cleanup on teardown
            setPeriodsPromise(null);
        };
    }, []);

    /**
     * Redirects to the period at the position in the periodsData array specified by the index parameter
     * @param {number} index - Index of the period to redirect to in the periodsData array
     */
    function redirectToPeriod(index) {
        const periodID = periodsData[index].id;
        browserHistory.push(`/collection/${periodID}`);
    }

    return (
        promiseNoData(periodsPromise, periodsData, periodsError) || (
            <CollectionCarousel
                collections={periodsData}
                onClickCarouselItem={redirectToPeriod}
            />
        )
    );
}

export default CollectionCarouselPresenter;
