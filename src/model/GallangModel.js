import _ from "underscore";
import "../types";
import CooperHewittSource from "./CooperHewittSource";

/** Class for keeping application state */
class GallangModel {
    /**
     * @constructor
     * @param {string[]} likedImageIDs - Array of image IDs the user has liked
     * @param {Array<{ id: string, lastViewedAt: Number}>} recentlyViewedImages - Array of images the user has viewed ordered by the timestamp of the viewing (latest first)
     * @param {Gallery[]} galleries - Array of galleries the user has created
     */

    constructor(likedImageIDs = [], recentlyViewedImages = [], galleries = []) {
        this.observers = [];
        this.likedImageIDs = likedImageIDs;
        this.recentlyViewedImages = recentlyViewedImages;
        // Placeholder galleries for now
        const exampleGalleries = [
            {
                title: "Dark and Moody",
                id: "12345",
                imageIDs: [],
            },
            {
                title: "Happy and Cheerful",
                id: "12346",
                imageIDs: [],
            },
            {
                title: "Almost Disgusting (but in a fun way)",
                id: "12347",
                imageIDs: [],
            },
        ];
        this.galleries = exampleGalleries;
        // this.galleries = galleries;
        this.currentRecommendations = [];
        this.isCurrentlyDragging = false;
    }

    /**
     * Setter function to always notify observers when the liked images are updated
     * @param {boolean} newValue - Updated value for the likedImageIDs property
     */
    set likedImageIDs(newValue) {
        this._likedImageIDs = newValue;
        this.notifyObservers();
    }

    /** Getter function for the likedImageIDs property (required for setter function) */
    get likedImageIDs() {
        return this._likedImageIDs;
    }

    /**
     * Setter function to always notify observers when the user's galleries are updated
     * @param {boolean} newValue - Updated value for the galleries property
     */
    set galleries(newValue) {
        this._galleries = newValue;
        this.notifyObservers();
    }

    /** Getter function for the galleries property (required for setter function) */
    get galleries() {
        return this._galleries;
    }

    /**
     * Setter function to always notify observers when the drag status changes
     * @param {boolean} newValue - Updated value for the isCurrentlyDragging property
     */
    set isCurrentlyDragging(newValue) {
        this._isCurrentlyDragging = newValue;
        this.notifyObservers();
    }

    /** Getter function for the isCurrentlyDragging property (required for setter function) */
    get isCurrentlyDragging() {
        return this._isCurrentlyDragging;
    }

    /** Setter function for the recentlyViewedImages property (required for getter function) */
    set recentlyViewedImages(imageArray) {
        this._recentlyViewedImages = imageArray; // Underscore before property name to avoid infinite loops with setter function
    }

    /** Getter function for the recentlyViewedImages property to always return the array sorted by latest access time (desc) */
    get recentlyViewedImages() {
        // Underscore before property name to avoid infinite loops with getter function
        return this._recentlyViewedImages.sort(
            (imageA, imageB) => imageB.lastViewedAt - imageA.lastViewedAt
        );
    }

    /** Sets the currentRecommendations property back to an empty array */
    resetCurrentRecommendations() {
        this.currentRecommendations = [];
    }

    /**
     * Adds an image to the recentlyViewedImages array in the model and notifies the observers
     * @param {string} imageID - Identifier of the image the user has accessed
     */
    addImageToRecentlyViewed(imageID) {
        const image = this.recentlyViewedImages.find(
            (image) => image.id === imageID
        );
        const newImageData = { id: imageID, lastViewedAt: Date.now() }; // updated or completely new image data
        if (!image) {
            // image not viewed before
            // add image information to recently viewed
            this.recentlyViewedImages = [
                newImageData,
                ...this.recentlyViewedImages,
            ];
        } else {
            // replace old image information with new in recently viewed
            this.recentlyViewedImages = this.recentlyViewedImages.map(
                (currentImage) => {
                    if (currentImage.id === imageID) return newImageData;
                    return currentImage;
                }
            );
        }
        this.notifyObservers();
    }

    /**
     * Adds an image ID to the likedImageIDs array in the model and notifies the observers
     * @param {string} imageID - Identifier of the image to like
     */
    likeImage(imageID) {
        const imageAlreadyLiked = this.likedImageIDs.includes(imageID);
        if (!imageAlreadyLiked) {
            this.likedImageIDs = [...this.likedImageIDs, imageID];
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
        }
    }

    /**
     * Adds an image ID to the specified gallery
     * @param {string} imageID - Identifier of the image to add
     * @param {string} galleryID - Identifier of the gallery to add the image to
     */
    addImageToGallery(imageID, galleryID) {
        const gallery = this.galleries.find(
            (gallery) => gallery.id === galleryID
        );
        if (!gallery) throw Error("Gallery with specified ID not found");
        const imageAlreadyInGallery = gallery.imageIDs.includes(imageID);
        if (!imageAlreadyInGallery) {
            const updatedGallery = { ...gallery }; // Make a copy of the current state of the gallery
            updatedGallery.imageIDs = [imageID, ...gallery.imageIDs]; // Add the new imageID to the front
            this.galleries = this.galleries.map((currentGallery) => {
                if (currentGallery.id === updatedGallery.id)
                    return updatedGallery; // Replace old with updated gallery
                return currentGallery;
            });
        }
    }

    /**
     * Uses the getRecommendation method to compute a recommendation based on the users liked images and a random recommendation basis
     * @returns {Recommendation | null} - Collection of recommended images including title/recommendation basis (e.g. medium, period, person)
     */
    async getRandomRecommendation() {
        const recommendationBases = ["type", "medium", "person"];

        // Pick a random recommendation basis at first
        const randomIndex = Math.floor(
            Math.random() * recommendationBases.length
        );
        let currentRecommendationBasisIndex = randomIndex;

        // Loop through recommendation bases until a new recommendation was found
        let hasFoundNewRecommendation = false;
        let recommendation = null;
        while (
            !hasFoundNewRecommendation &&
            currentRecommendationBasisIndex <
                randomIndex + recommendationBases.length // Start at random index and go around in circle
        ) {
            const currentRecommendationBasis =
                recommendationBases[
                    currentRecommendationBasisIndex % recommendationBases.length
                ];
            let currentRecommendation = null;
            try {
                currentRecommendation = await this.getRecommendation(
                    currentRecommendationBasis
                );
            } catch (error) {
                // console.error(error);
            }
            if (currentRecommendation) {
                recommendation = currentRecommendation;
                hasFoundNewRecommendation = true;
            }
            currentRecommendationBasisIndex++;
        }

        return recommendation; // null if no new recommendation could be computed
    }

    /**
     * Evaluates a user's liked content to return recommended images including title/recommendation basis (e.g. medium, period, person)
     * @param {"type" | "medium" | "person"} [recommendationBasis = "type"] - Basis/type of the recommendation
     * @returns {Recommendation} - Collection of recommended images including title/recommendation basis (e.g. medium, period, person)
     */
    async getRecommendation(recommendationBasis = "type") {
        // Initialize recommendation object
        let recommendation = {
            title: null,
            images: null,
            basisImageID: null,
        };

        // Check whether user has liked images as basis for the recommendation
        if (this.likedImageIDs.length === 0) {
            throw Error(
                "User has not liked any images yet, cannot compute recommendation."
            );
        }

        // Loop through liked images until a recommendation was computed
        let hasFoundNewRecommendation = false;
        const randomImageIDIndex = Math.floor(
            Math.random() * this.likedImageIDs.length
        ); // pick a random image ID at first
        let imageIDIndex = randomImageIDIndex;
        while (
            !hasFoundNewRecommendation &&
            imageIDIndex < randomImageIDIndex + this.likedImageIDs.length // Start at random index and go around in circle
        ) {
            const currentImageID = this.likedImageIDs[
                imageIDIndex % this.likedImageIDs.length
            ]; // Go around in circle
            let currentRecommendation;
            try {
                currentRecommendation = await this.getRecommendationByImageID(
                    currentImageID,
                    recommendationBasis
                );
            } catch (error) {
                // console.error(error);
            }
            const hasFoundRecommendation =
                currentRecommendation.title &&
                currentRecommendation.basisImageID &&
                currentRecommendation.images &&
                currentRecommendation.images.length > 0;
            const isNewRecommendation = !this.currentRecommendations.find(
                (currentRecommendationInArray) => {
                    const hasSameTitle =
                        currentRecommendationInArray.title ===
                        currentRecommendation.title;
                    return hasSameTitle;
                }
            );
            if (hasFoundRecommendation && isNewRecommendation) {
                recommendation = currentRecommendation;
                hasFoundNewRecommendation = true;
            }
            imageIDIndex++; // Increase index to inspect next image ID on next iteration
        }

        // Check recommendation object for valid data
        if (!recommendation.title)
            throw Error("Recommendation has invalid title.");
        if (!recommendation.images || recommendation.images.length === 0)
            throw Error("Recommendation has no images.");
        if (!recommendation.basisImageID)
            throw Error("Recommendation has no basis image ID.");

        this.currentRecommendations = [
            ...this.currentRecommendations,
            recommendation,
        ];

        return recommendation;
    }

    /**
     *
     * @param {string} imageID - Unique identifier of the image (object in the Cooper Hewitt collection)
     * @param {"type" | "medium" | "person"} [recommendationBasis = "type"] - Basis/type of the recommendation
     * @returns {Recommendation} - Collection of recommended images including title/recommendation basis (e.g. medium, period, person)
     */
    async getRecommendationByImageID(imageID, recommendationBasis = "type") {
        // Initialize recommendation object
        const recommendation = {
            title: null,
            images: null,
            basisImageID: imageID,
        };
        let searchParams = {}; // parameters for the search API call

        // Get info (incl. medium info) about that image ID
        const imageInfo = await CooperHewittSource.getObjectInfo(imageID);

        // Set search parameters and recommendation title
        if (recommendationBasis === "type") {
            searchParams.type_id = imageInfo.type_id;
            recommendation.title = imageInfo.type;
        }
        if (recommendationBasis === "medium") {
            searchParams.media_id = imageInfo.media_id;
            recommendation.title = toTitleCase(imageInfo.medium);
        }
        if (recommendationBasis === "person") {
            if (imageInfo.participants.length === 0)
                Error("Object has no participants to base recommendation off.");
            const randomPerson = _.sample(imageInfo.participants); // Select a random participant
            searchParams.person_id = randomPerson.person_id;
            recommendation.title = randomPerson.person_name;
        }

        // Check recommendation object for valid data
        if (!recommendation.title) Error("Recommendation has invalid title.");

        // Check in current recommendations whether the images were fetched earlier
        const earlierRecommendation = this.currentRecommendations.find(
            (currentRecommendationInArray) => {
                const hasSameTitle =
                    currentRecommendationInArray.title === recommendation.title;
                return hasSameTitle;
            }
        );
        const isNewRecommendation = !earlierRecommendation;

        // If images were fetched before return recommendation from earlier
        if (!isNewRecommendation) return earlierRecommendation;

        // Get recommended images
        const recommendedObjects = await CooperHewittSource.searchObjects(
            searchParams
        ); // Search Cooper Hewitt collection for objects with that search parameters
        const recommendedImages = recommendedObjects.map((object) => ({
            id: object.id,
        })); // Transform objects into expected image array

        // Set recommendation images
        recommendation.images = recommendedImages;

        // Check recommendation object for valid data
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
