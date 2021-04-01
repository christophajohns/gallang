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
                const exampleCollections = [
                    {
                        title: "Botanical Expressions",
                        id: "1159161457",
                        numberOfImages: 127,
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
                            {
                                id: "18572193",
                                url: "https://images.collection.cooperhewitt.org/358336_b263766f8bd08cea_b.jpg",
                                liked: false,
                            },
                        ]
                    },
                    {
                        title: "Willi Smith: Street Couture",
                        id: "2318802364",
                        numberOfImages: 54,
                        images: [
                            {
                                id: "2318802528",
                                url: "https://images.collection.cooperhewitt.org/359181_4aaa6a9bc518e309_b.jpg",
                                liked: true,
                            },
                            {
                                id: "2318798785",
                                url: "https://images.collection.cooperhewitt.org/362156_85badf648bb66f36_b.jpg",
                                liked: false,
                            },
                            {
                                id: "2318802447",
                                url: "https://images.collection.cooperhewitt.org/358786_557804dd78c97513_b.jpg",
                                liked: false,
                            },
                            {
                                id: "2318802553",
                                url: "https://images.collection.cooperhewitt.org/359183_3fb40ac46376476d_b.jpg",
                                liked: true,
                            },
                        ]
                    },
                    {
                        title: "Contemporary Muslim Fashions",
                        id: "2318802212",
                        numberOfImages: 23,
                        images: [
                            {
                                id: "2318797273",
                                url: "https://images.collection.cooperhewitt.org/348036_88262b84479c8e3d_b.jpg",
                                liked: false,
                            },
                            {
                                id: "2318797274",
                                url: "https://images.collection.cooperhewitt.org/362801_dff4c4ae4c986572_b.jpg",
                                liked: true,
                            },
                            {
                                id: "2318797275",
                                url: "https://images.collection.cooperhewitt.org/362802_d212f5fa7168939c_b.jpg",
                                liked: true,
                            },
                            {
                                id: "2318797279",
                                url: "https://images.collection.cooperhewitt.org/349014_aab7151604c0d04c_b.jpg",
                                liked: true,
                            },
                        ]
                    },
                    {
                        title: "Herbert Bayer: Bauhaus Master",
                        id: "2318800172",
                        numberOfImages: 184,
                        images: [
                            {
                                id: "18728283",
                                url: "https://images.collection.cooperhewitt.org/90760_17ed0b864a5c15b1_b.jpg",
                                liked: true,
                            },
                            {
                                id: "907215319",
                                url: "https://images.collection.cooperhewitt.org/304348_71cfcbf89d7556eb_b.jpg",
                                liked: false,
                            },
                            {
                                id: "907215339",
                                url: "https://images.collection.cooperhewitt.org/348643_ec631c4d5f76d6f8_b.jpg",
                                liked: false,
                            },
                            {
                                id: "907215577",
                                url: "https://images.collection.cooperhewitt.org/348658_d85d9d5e1a7390c6_b.jpg",
                                liked: true,
                            },
                        ]
                    },
                    {
                        title: "After Icebergs",
                        id: "1159161457",
                        numberOfImages: 47,
                        images: [
                            {
                                id: "18196343",
                                url: "https://images.collection.cooperhewitt.org/358184_a093a0ec27d78686_b.jpg",
                                liked: false,
                            },
                            {
                                id: "18196347",
                                url: "https://images.collection.cooperhewitt.org/358185_3fae1a563f9650ee_b.jpg",
                                liked: false,
                            },
                            {
                                id: "18196351",
                                url: "https://images.collection.cooperhewitt.org/358186_7d41ff34b1898ec4_b.jpg",
                                liked: false,
                            },
                            {
                                id: "18196371",
                                url: "https://images.collection.cooperhewitt.org/358187_3dd58f177859d505_b.jpg",
                                liked: false,
                            },
                        ]
                    },
                ];
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
 * @property {number} numberOfImages - The number of images or objects within the collection/exhibition
 * @property {Image[]} images - Array of objects or images within the collection
 */

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 * @property {string} url - Image url for the object
 * @property {bool} liked - Flag whether the user has liked this image
 */

export default CooperHewittSource;