import { mockCollections, mockQuote } from "./MockData";
import "../types";

/** Object to interact with the Cooper Hewitt API */
const CooperHewittSource = {
    /**
     * Make a call to the Cooper Hewitt API
     * @param {string} params - String representing the API method's parameters
     * @returns Response as a JavaScript object
     */
    async apiCall(params) {
        try {
            const response = await fetch(`${process.env.BASE_URL}${params}`, {
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
     * @returns {Promise<string>} - Promise object holding a string representing the quote content
     * @example "Maybe something by Huey Lewis?"
     */
    getQuote() {
        const quotePromise = new Promise((resolve, reject) => {
            // Placeholder for actual API call
            setTimeout(() => {
                resolve(mockQuote); // Return example quote for now
            }, 300);
        });
        return quotePromise;
    },
};

export default CooperHewittSource;
