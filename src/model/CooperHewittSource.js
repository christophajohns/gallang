/** Object to interact with the Cooper Hewitt API */
const CooperHewittSource = {
    /**
     * Get object collections from the API.
     * @param {number} numberOfCollections - Number of collections to be fetched (default: 10; compare items per page in API Docs)
     * @returns {Promise<Collection[]>} - Promise object holding an array of collections
     * @example
     *  [{
            title: "Botanical Expressions",
            id: "1159161457",
            images: [
                {
                    id: "18411435",
                    url: "https://images.collection.cooperhewitt.org/152056_fd1b6ff7c925bf70_b.jpg",
                    liked: true,
                },
                {
                    id: "18564459",
                    url: "https://images.collection.cooperhewitt.org/4049_41d50b6349a8bfdd_b.jpg",
                    liked: false,
                },
                {
                    id: "18731639",
                    url: "https://images.collection.cooperhewitt.org/116097_d655ed99df905bd4_b.jpg",
                    liked: false,
                },
            ]
        },]
     */
    getCollections(numberOfCollections = 10) {
        const collectionsPromise = new Promise((resolve, reject) => { // Placeholder for actual API call
            setTimeout(() => { 
                const exampleCollections = [{
                    title: "Botanical Expressions",
                    id: "1159161457",
                    images: [
                        {
                            id: "18411435",
                            url: "https://images.collection.cooperhewitt.org/152056_fd1b6ff7c925bf70_b.jpg",
                            liked: true,
                        },
                        {
                            id: "18564459",
                            url: "https://images.collection.cooperhewitt.org/4049_41d50b6349a8bfdd_b.jpg",
                            liked: false,
                        },
                        {
                            id: "18731639",
                            url: "https://images.collection.cooperhewitt.org/116097_d655ed99df905bd4_b.jpg",
                            liked: false,
                        },
                    ]
                },];
                resolve(exampleCollections); // Return example array for now
            }, 300);
          });
        return collectionsPromise;
    },
};

/**
 * @typedef Collection
 * @property {string} title - Name or title of the collection
 * @property {string} id - Unique identifier of the collection
 * @property {Image[]} images - Array of objects or images within the collection
 */

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 * @property {string} url - Image url for the object
 * @property {bool} liked - Flag whether the user has liked this image
 */

export default CooperHewittSource;