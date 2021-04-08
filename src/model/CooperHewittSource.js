import { mockCollections, mockQuote } from "./MockData";
import "../types";

/** Object to interact with the Cooper Hewitt API */
const CooperHewittSource = {
    /**
     * Make a call to the Cooper Hewitt API
     * @param {Object} params - String representing the API method's parameters
     * @param {string} params.method - API method to call
     * @returns {Promise<Object>} - Promise holding the response as a JavaScript object
     */
    async apiCall(params) {
        const filteredParams = filterTruthyKeys(params); // remove unused (falsy) keys from params to avoid errors
        const urlSearchParams = new URLSearchParams({
            access_token: process.env.REACT_APP_ACCESS_TOKEN,
            ...filteredParams,
        });
        const url = `${process.env.REACT_APP_BASE_URL}?${urlSearchParams}`;
        try {
            const response = await fetch(url, {
                method: "GET",
            });
            if (response.status !== 200) {
                throw response.statusText;
            }
            return response.json();
        } catch (error) {
            console.log("Error:", error);
        }
    },
    /**
     * Search objects in the Cooper Hewitt collection (see https://collection.cooperhewitt.org/api/methods/cooperhewitt.search.objects)
     * @param {Object} searchParams - Object representing of the search parameters
     * @param {string} searchParams.query - Search for objects matching terms across all the text fields
     * @param {number} maximumNumberOfResults - Maximum number of objects to return (i.e. objects per page since only one page is returned; maximum 500)
     * @returns {Promise<CooperHewittObject[]>} - Array holding objects with information about one Cooper Hewitt Object each matching the search parameters
     */
    async searchObjects(searchParams, maximumNumberOfResults = 12) {
        if (maximumNumberOfResults > 500) {
            throw Error("Maximum 500 objects can be returned on one page.");
        }
        const params = {
            method: "cooperhewitt.search.objects",
            has_images: true,
            page: 1,
            per_page: maximumNumberOfResults,
            ...searchParams,
        };
        const data = await CooperHewittSource.apiCall(params);
        return data.objects;
    },
    /**
	 * Get object collections from the API.
	 * @param {number} numberOfCollections - Number of collections to be fetched (default: 10; compare items per page in API Docs)
	 * @returns {Promise<Collection[]>} - Promise object holding an array of collections
	 * @example
	 *  [
     *      {
                title: "Botanical Expressions",
                id: "1159161457",
                numberOfImages: 127,
                images: [
                    {
                        id: "18411435",
                        url: "https://images.collection.cooperhewitt.org/152056_fd1b6ff7c925bf70_b.jpg",
                        liked: true,
                    },
                    …
                ]
            },
            …
        ]
	*/
    getCollections(numberOfCollections = 10) {
        const collectionsPromise = new Promise((resolve, reject) => {
            // Placeholder for actual API call
            setTimeout(() => {
                resolve(mockCollections); // Return example array for now
            }, 300);
        });
        return collectionsPromise;
    },
    /**
     * Get a random Micah Walter quote from the API.
     * @param {boolean} useMockData - (optional) Flag whether to use the API or local mock data instead (default: false)
     * @returns {Promise<string>} - Promise object holding a string representing the quote content
     * @example "Maybe something by Huey Lewis?"
     */
    async getQuote(useMockData = false) {
        // Return mock data instead of making API call if useMockData flag is set to true
        if (useMockData) {
            const quote = await getMockData("quote");
            return quote;
        }

        // Otherwise make API call
        const params = {
            method: "cooperhewitt.labs.whatWouldMicahSay",
        };
        const data = await CooperHewittSource.apiCall(params);

        return data.micah.says;
    },
};

// -- Utility functions --
/**
 * Utility function to filter and keep only truthy keys from an object
 * @param {Object} object - Object to filter
 * @returns {Object} - Object containing only truthy keys from the original object
 */
function filterTruthyKeys(object) {
    const filteredObject = {};
    Object.keys(object).forEach((key, _index) => {
        if (object[key]) filteredObject[key] = object[key];
    });
    return filteredObject;
}

/**
 * Asynchronously fetch mock data for API calls
 * @param {"quote"|"collections"} type - Type of mock data to return
 * @returns Mock data representing a response from the Cooper Hewitt API
 */
async function getMockData(type) {
    let mockData;
    switch (type) {
        case "quote":
            mockData = mockQuote;
            break;

        case "collections":
            mockData = mockCollections;
            break;

        default:
            break;
    }
    const promise = new Promise((resolve, reject) => {
        // Placeholder for actual API call
        setTimeout(() => {
            resolve(mockData);
        }, 300);
    });
    return promise;
}

export default CooperHewittSource;
