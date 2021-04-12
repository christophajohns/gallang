import "../types";
import CooperHewittSource from "./CooperHewittSource";

/** Class for keeping application state */
class GallangModel {
    /**
     * @constructor
     * @param {string[]} likedImageIDs - Array of image IDs the user has liked
     */
    constructor(likedImageIDs = []) {
        this.observers = [];
        this.likedImageIDs = likedImageIDs;
    }

    /**
     * Adds an image ID to the likedImageIDs array in the model and notifies the observers
     * @param {string} imageID - Identifier of the image to like
     */
    likeImage(imageID) {
        const imageAlreadyLiked = this.likedImageIDs.includes(imageID);
        if (!imageAlreadyLiked) {
            this.likedImageIDs = [...this.likedImageIDs, imageID];
            this.notifyObservers();
        }
    }

    /**
     * Removes an image ID to the likedImageIDs array in the model and notifies the observers
     * @param {string} imageID - Identifier of the image to unlike
     */
    unlikeImage(imageID) {
        const imageIsLiked = this.likedImageIDs.find(
            (currentImageID) => currentImageID === imageID
        );
        if (imageIsLiked) {
            this.likedImageIDs = this.likedImageIDs.filter(
                (currentImageID) => currentImageID !== imageID
            );
            this.notifyObservers();
        }
    }

    /**
     * Evaluates a user's liked content to return recommended images including title/recommendation basis (e.g. medium, period, person)
     * @param {"type" | "medium" | "person" | "period"} recommendationBasis - Basis/type of the recommendation
     * @returns {Recommendation} - Collection of recommended images including title/recommendation basis (e.g. medium, period, person)
     */
    async getRecommendation(recommendationBasis = "person") {
        // Initialize recommendation object
        let recommendation = {
            title: null,
            images: null,
        };

        // Check whether user has liked images as basis for the recommendation
        if (this.likedImageIDs.length === 0) {
            throw Error(
                "User has not liked any images yet, cannot compute recommendation."
            );
        }

        // Loop through liked images until a recommendation was computed
        let hasFoundRecommendation = false;
        let imageIDIndex = 0;
        while (
            !hasFoundRecommendation &&
            imageIDIndex < this.likedImageIDs.length
        ) {
            const currentImageID = this.likedImageIDs[imageIDIndex];
            let currentRecommendation;
            try {
                currentRecommendation = this.getRecommendationByImageID(
                    currentImageID,
                    recommendationBasis
                );
            } catch (error) {
                // console.error(error);
            }
            hasFoundRecommendation =
                recommendation.title &&
                recommendation.images &&
                recommendation.images.length > 0;
            if (hasFoundRecommendation) recommendation = currentRecommendation;
            imageIDIndex++; // Increase index to inspect next image ID on next iteration
        }

        // Check recommendation object for valid data
        if (!recommendation.title) Error("Recommendation has invalid title.");
        if (!recommendation.images || recommendation.images.length === 0)
            Error("Recommendation has no images.");

        return recommendation;
    }

    /**
     *
     * @param {string} imageID - Unique identifier of the image (object in the Cooper Hewitt collection)
     * @param {"type" | "medium" | "person" | "period"} recommendationBasis - Basis/type of the recommendation
     * @returns {Recommendation} - Collection of recommended images including title/recommendation basis (e.g. medium, period, person)
     */
    async getRecommendationByImageID(imageID, recommendationBasis = "type") {
        // Initialize recommendation object
        const recommendation = {
            title: null,
            images: null,
        };
        let searchParams = {}; // parameters for the search API call

        // Get info (incl. medium info) about that image ID
        const imageInfo = await CooperHewittSource.getObjectInfo(imageID);

        // Set search parameters and recommendation title
        if (recommendationBasis === "type") {
            searchParams.type_id = imageInfo.type_id;
            recommendation.title = toTitleCase(imageInfo.type);
        }
        if (recommendationBasis === "medium") {
            searchParams.media_id = imageInfo.media_id;
            recommendation.title = toTitleCase(imageInfo.medium);
        }
        if (recommendationBasis === "person") {
            if (imageInfo.participants.length === 0)
                Error("Object has no participants to base recommendation off.");
            const person = imageInfo.participants[0];
            searchParams.person_id = person.person_id;
            recommendation.title = toTitleCase(person.person_name);
        }

        // Get recommended images
        const recommendedObjects = await CooperHewittSource.searchObjects(
            searchParams
        ); // Search Cooper Hewitt collection for objects with that search parameters
        const recommendedImages = recommendedObjects.map((object) => ({
            id: object.id,
            url: object.images[0].b.url, // Big version of first image for object
        })); // Transform objects into expected image array

        // Set recommendation images
        recommendation.images = recommendedImages;

        // Check recommendation object for valid data
        if (!recommendation.title) Error("Recommendation has invalid title.");
        if (!recommendation.images || recommendation.images.length === 0)
            Error("Recommendation has no images.");

        return recommendation;
    }

    /**
     * Adds an observer calling the specified callback function
     * @param {observerCallback} callback - Callback function to be called when observed value changes
     */
    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }

    /**
     * Removes the specified observer callback
     * @param {observerCallback} callback - Callback function to be removed
     */
    removeObserver(callback) {
        this.observers = this.observers.filter(
            (observer) => observer !== callback
        );
    }

    /** Calls each callback function in the observers array */
    notifyObservers() {
        this.observers.forEach((callback) => {
            setTimeout(() => {
                try {
                    callback();
                } catch (error) {
                    console.error(error);
                }
            }, 0);
        });
    }
}

// -- UTILITY FUNCTIONS --
/**
 * Utility function to transform any string to its title case version (see https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript)
 * @param {string} str - String to transform
 * @returns Title case version of the input string
 */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export default GallangModel;
