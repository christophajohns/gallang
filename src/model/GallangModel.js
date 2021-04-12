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
     * @param {"medium" | "person" | "period"} - Basis/type of the recommendation
     * @returns {Recommendation} - Collection of recommended images including title/recommendation basis (e.g. medium, period, person)
     */
    getRecommendation(type = "medium") {
        // Initialize recommendation object
        const recommendation = {
            title: null,
            images: null,
        };

        // Get info for first liked image
        if (this.likedImageIDs.length === 0)
            throw Error(
                "User has not liked any images yet, cannot compute recommendation."
            );
        const firstLikedImageID = this.likedImageIDs[0]; // Get first liked image's ID
        const imageInfo = CooperHewittSource.getObjectInfo(firstLikedImageID); // Get info (incl. medium info) about that image ID

        // Get recommendation data
        if (type === "medium") {
            const mediumOfFirstLikedImage = imageInfo.medium; // Get medium of first liked image
            const mediaIDOfFirstLikedImage = imageInfo.media_id; // Get media ID of first liked image
            const recommendedObjects = CooperHewittSource.searchObjects({
                media_id: mediaIDOfFirstLikedImage,
            }); // Search Cooper Hewitt collection for objects with that media ID
            recommendation.title = mediumOfFirstLikedImage; // Set title of recommendation to medium
            const recommendedImages = recommendedObjects.map((object) => ({
                id: object.id,
                url: object.images[0].b.url, // Big version of first image for object
            })); // Transform objects into expected image array
            recommendation.images = recommendedImages; // Set images of recommendation to this image array
        }

        // Check recommendation object for valid data
        if (!recommendation.title) Error("Recommendation has invalid title.");
        if (!recommendation.images) Error("Recommendation has no images.");

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

export default GallangModel;
