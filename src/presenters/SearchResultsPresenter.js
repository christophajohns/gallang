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
    const [searchData, setSearchData, searchError, setSearchError] = usePromise(
        searchPromise
    );

    // Custom Hooks
    const urlSearchParams = useURLSearchParams(); // Get URL search parameters (e.g. query=somesearchquery) from URL
    const query = urlSearchParams.get("query");

    // Effects
    React.useEffect(() => {
        setSearchPromise(CooperHewittSource.searchObjects({ query }));
        setSearchData(null);
        setSearchError(null);
    }, [query, setSearchData, setSearchError]);

    return (
        promiseNoData(searchPromise, searchData, searchError) || (
            <ResultsPresenter
                contentType="search results"
                title={!query ? "All images" : `"${query}"`} // Set title to "All images" if user enters via /search (without parameters)
                numberOfObjects={searchData.length}
                images={searchData.reduce((objects, currentObject) => {
                    if (
                        !!currentObject.id &&
                        !!currentObject.images?.length &&
                        !!currentObject.images[0].b?.url
                    ) {
                        objects.push({
                            id: currentObject.id,
                            url: currentObject.images[0].b.url,
                        });
                    }
                    return objects; // Skip over objects with missing properties
                }, [])}
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
