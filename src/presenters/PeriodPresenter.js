import React from "react";
import { HorizontalGridPresenter } from "../presenters";
import { promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { usePromise } from "./customHooks";
import "../types";

/**
 * Presenter for a grid of a periods objects
 * @param {GallangModel} props.model - The model holding the application state
 * @param {string} props.title - Title or name of the period
 * @param {string} props.id - Unique identifier of the period
 * @returns Loading spinner or HorizontalGrid
 */
function PeriodPresenter(props) {
    const { model, title, id } = props;

    const [periodImagesPromise, setPeriodImagesPromise] = React.useState(null);
    const [periodImagesData, , periodImagesError] = usePromise(
        periodImagesPromise
    );

    React.useEffect(() => {
        // only at creation
        setPeriodImagesPromise(CooperHewittSource.getPeriodImages(id));
        return () => {
            // cleanup on teardown
            setPeriodImagesPromise(null);
        };
    }, [id]);

    return (
        promiseNoData(
            periodImagesPromise,
            periodImagesData,
            periodImagesError
        ) || (
            <HorizontalGridPresenter
                type="collection"
                title={title}
                images={periodImagesData.slice(0, 12)} // only display first 12 images
                model={model}
                href={`/collection/${id}`}
            />
        )
    );
}

export default PeriodPresenter;
