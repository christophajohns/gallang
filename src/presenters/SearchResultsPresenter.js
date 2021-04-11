import { useURLSearchParams } from "./customHooks";
import { ResultsView } from "../views";

/** Placeholder presenter to test routing for the search results */
function SearchResultsPresenter() {
    const urlSearchParams = useURLSearchParams();

    /**
     * Example function on how to access information from the URL
     * @param {URLSearchParams} urlSearchParams - URLSearchParams object representing the parameters passed via the URL
     */
    function logQueryStringFromURL(urlSearchParams) {
        const query = urlSearchParams.get("query");
        console.log({ query });
    }

    logQueryStringFromURL(urlSearchParams);

    return <ResultsView contentType={"search results"} />;
}

export default SearchResultsPresenter;
