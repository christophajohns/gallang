import "../types";

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
        const recommendation = {
            title: "Example medium",
            images: [],
        };
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
