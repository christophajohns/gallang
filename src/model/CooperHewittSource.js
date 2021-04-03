import { mockCollections } from "./MockData";
import "../types";

/** Object to interact with the Cooper Hewitt API */
const CooperHewittSource = {
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
};

export default CooperHewittSource;
