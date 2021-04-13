import React from "react";
import { useURLSearchParams } from "./customHooks";
import { ResultsPresenter } from "../presenters";
import { promiseNoData } from "../components";
import { usePromise } from "./customHooks";
import { modelType as imagePresenterModelType } from "./ImagePresenter";
import { CooperHewittSource } from "../model";

/**
 * Presenter for the search results page content.
 * @param {Object} props - Properties to be passed to the view
 * @param {Object} props.model - Model keeping the application state
 * @param {Function} props.model.likeImage - Function to like an image by its ID
 * @param {Function} props.model.unlikeImage - Function to unlike an image by its ID
 * @param {string[]} props.model.likedImageIDs - Array of image IDs the user has liked already
 */
function SearchResultsPresenter(props) {
    // Props
    const { model } = props;

    // State
    const [searchPromise, setSearchPromise] = React.useState(null);
    const searchPromiseStatesAndSetters = usePromise(searchPromise);
    const searchData = searchPromiseStatesAndSetters[0];
    const searchError = searchPromiseStatesAndSetters[2];

    // Custom Hooks
    const urlSearchParams = useURLSearchParams(); // Get URL search parameters (e.g. query=somesearchquery) from URL
    const query = urlSearchParams.get("query");

    // Effects
    React.useEffect(() => {
        // only at creation
        setSearchPromise(CooperHewittSource.searchObjects({ query }));
    }, [query]);

    return (
        promiseNoData(searchPromise, searchData, searchError) || (
            <ResultsPresenter
                contentType="search results"
                title={`"${query}"`}
                numberOfObjects={searchData.length}
                images={searchData.map((object) => ({
                    id: object.id,
                    url: object.images[0].b.url,
                }))}
                allowDownloadAll={false}
                model={model}
            />
        )
    );
}

SearchResultsPresenter.propTypes = {
    model: imagePresenterModelType.isRequired,
};

export default SearchResultsPresenter;
