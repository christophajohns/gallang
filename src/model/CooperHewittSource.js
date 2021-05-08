import { mockCollections, mockQuote } from "./MockData";
import "../types";

/** Object to interact with the Cooper Hewitt API */
const CooperHewittSource = {
    /**
     * Try to get data from the cache, but fall back to fetching it live.
     * @param {string} url - Requested url
     */
    async getData(url) {
        const cacheVersion = 1;
        const cacheName = `gallang-${cacheVersion}`;
        let cachedData = await this.getCachedData(cacheName, url);

        if (cachedData) {
            // console.log("Retrieved cached data");
            return cachedData;
        }

        // console.log("Fetching fresh data");

        const cacheStorage = await caches.open(cacheName);
        await cacheStorage.add(url);
        cachedData = await this.getCachedData(cacheName, url);
        await this.deleteOldCaches(cacheName);

        return cachedData;
    },
    /**
     * Get data from the cache.
     * @param {string} cacheName - Name of the cache to get data from
     * @param {string} url - Requested url
     */
    async getCachedData(cacheName, url) {
        const cacheStorage = await caches.open(cacheName);
        const cachedResponse = await cacheStorage.match(url);

        if (!cachedResponse || !cachedResponse.ok) {
            return false;
        }

        return await cachedResponse.json();
    },
    /**
     * Delete any old caches to respect user's disk space.
     * @param {string} currentCache - Name of the current cache
´     */
    async deleteOldCaches(currentCache) {
        const keys = await caches.keys();

        for (const key of keys) {
            const isOurCache = "gallang-" === key.substr(0, 6);

            if (currentCache === key || !isOurCache) {
                continue;
            }

            caches.delete(key);
        }
    },
    /**
     * Make a call to the Cooper Hewitt API
     * @param {Object} params - String representing the API method's parameters
     * @param {string} params.method - API method to call
     * @returns {Promise<Object>} - Promise holding the response as a JavaScript object
     */
    async apiCall(params) {
        const filteredParams = filterTruthyKeys(params); // remove unused (falsy) keys from params to avoid errors
        const urlSearchParams = new URLSearchParams({
            access_token: process.env.REACT_APP_COOPER_HEWITT_ACCESS_TOKEN,
            ...filteredParams,
        });
        const url = `${process.env.REACT_APP_COOPER_HEWITT_BASE_URL}?${urlSearchParams}`;
        try {
            const responseJSON = await this.getData(url);
            return responseJSON;
        } catch (error) {
            console.log("Error:", error);
        }
    },
    /**
     * Search objects in the Cooper Hewitt collection (see https://collection.cooperhewitt.org/api/methods/cooperhewitt.search.objects)
     * @param {Object} searchParams - Object representing of the search parameters
     * @param {string} [searchParams.query] - Search for objects matching terms across all the text fields
     * @param {string} [searchParams.media_id] - Identifier for the medium (e.g. "screenprint on paper") in the Cooper Hewitt collection
     * @param {string} [searchParams.person_id] - Identifier for the person (e.g. "Andy Warhol") in the Cooper Hewitt collection
     * @param {string} [searchParams.type_id] - Identifier for the object type (e.g. "Poster") in the Cooper Hewitt collection
     * @param {string} [searchParams.period_id] - Identifier for the period (e.g. "Baroque") in the Cooper Hewitt collection
     * @param {number} [maximumNumberOfResults = 100] - Maximum number of objects to return (i.e. objects per page since only one page is returned; maximum 500)
     * @returns {Promise<CooperHewittObject[]>} - Array holding objects with information about one Cooper Hewitt Object each matching the search parameters
     */
    async searchObjects(searchParams, maximumNumberOfResults = 100) {
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
     * Return detailed information for an object in the Cooper Hewitt collection (see https://collection.cooperhewitt.org/api/methods/cooperhewitt.objects.getInfo)
     * @param {string} objectID - Unique identifier of the object inside the Cooper Hewitt collection
     * @returns {Promise<CooperHewittObject>} - Object holding the information of the specified object in the Cooper Hewitt collection
     */
    async getObjectInfo(objectID) {
        const params = {
            method: "cooperhewitt.objects.getInfo",
            object_id: objectID,
            extras: "images,colors,exhibitions,metrics,participants,tombstone", // Return the maximum of information from the API
        };
        const data = await CooperHewittSource.apiCall(params);
        return data.object;
    },
    /**
	 * Get object collections from the API.
	 * @param {number} numberOfCollections - Number of collections to be fetched (default: 10; compare items per page in API Docs)
     * @param {boolean} useMockData - (optional) Flag whether to use the API or local mock data instead (default: true for now)
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
    async getCollections(numberOfCollections = 10, useMockData = true) {
        // Return mock data instead of making API call if useMockData flag is set to true
        const collections = await getMockData("collections");
        return collections;
    },
    /**
     * Get a list of periods from the API (see https://collection.cooperhewitt.org/api/methods/cooperhewitt.periods.getList/explore/)
     * @param {number} maximumNumberOfPeriods - Maximum number of periods to be fetched
     * @param {number} offset - Number of periods to skip for the results
     * @returns {Promise<PeriodWithoutImages[]>} - Promise object holding an array of objects representing the period's content
     */
    async getPeriodsList(maximumNumberOfPeriods = 10, offset = 0) {
        const params = {
            method: "cooperhewitt.periods.getList",
            per_page: maximumNumberOfPeriods + offset,
        };
        const data = await CooperHewittSource.apiCall(params);

        const periods = data.periods.slice(
            offset,
            maximumNumberOfPeriods + offset
        );

        return periods;
    },
    /**
     * Get a list of periods including their images from the API.
     * @param {number} maximumNumberOfPeriods - Maximum number of periods to be fetched
     * @param {number} offset - Number of periods to skip for the results
     * @returns {Promise<Period[]>} - Promise object holding an array of objects representing the period's content (incl. its images)
     */
    async getPeriods(maximumNumberOfPeriods = 10, offset = 0) {
        const periodsWithoutImages = await CooperHewittSource.getPeriodsList(
            maximumNumberOfPeriods,
            offset
        );

        const periods = await Promise.all(
            periodsWithoutImages.map(async (periodWithoutImages) => {
                const periodImages = await CooperHewittSource.getPeriodImages(
                    periodWithoutImages.id
                );

                return {
                    ...periodWithoutImages,
                    title: periodWithoutImages.name,
                    images: periodImages,
                    numberOfImages: periodImages.length,
                };
            })
        );

        return periods;
    },
    /**
     * Get the images of the objects from a certain period
     * @param {string} periodID - Unique identifier of the period
     * @returns {Promise<Image[]>} - Promise object holding an array of images of objects from the specified period
     */
    async getPeriodImages(periodID) {
        const periodObjects = await CooperHewittSource.searchObjects({
            period_id: periodID,
        });
        const periodImages = periodObjects.map((object) => ({
            id: object.id,
            url: object.images[0].b.url,
        }));
        return periodImages;
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
