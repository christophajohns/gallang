// Object to interact with the Cooper Hewitt API
const CooperHewittSource = {
    // Method to get object collections from the API
    // Params:
    // - numberOfCollections: number of collections to be fetched (default: 10)
    // Returns:
    // Promise of array of collection objects
    // Example collections array:
    // [{
    //     title: "Botanical Expressions",
    //     images: [
    //         {
    //             id: "123456",
    //             url: "https://...",
    //             liked: false,
    //         },
    //     ]
    // },]
    getCollections(numberOfCollections = 10) {
        const collectionsPromise = new Promise((resolve, reject) => { // Placeholder for actual API call
            setTimeout(() => { 
                const exampleCollections = [{
                    title: "Botanical Expressions",
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

export default CooperHewittSource;