import _ from "underscore";
import "../types";
import { toTitleCase } from "../utils";
import CooperHewittSource from "./CooperHewittSource";
import { v4 as uuidV4 } from "uuid";
import { AuthenticationService } from ".";
// eslint-disable-next-line no-unused-vars
import firebase from "firebase/app"; // only imported for JSDoc type

/** Class for keeping application state */
class GallangModel {
    /**
     * @constructor
     * @param {firebase.User} currentUser - Object holding info about currently logged in user
     * @param {string[]} likedImageIDs - Array of image IDs the user has liked
     * @param {Array<{ id: string, lastViewedAt: Number}>} recentlyViewedImages - Array of images the user has viewed ordered by the timestamp of the viewing (latest first)
     * @param {Gallery[]} galleries - Array of galleries the user has created
     */

    constructor(
        currentUser = null,
        likedImageIDs = [],
        recentlyViewedImages = [],
        galleries = []
    ) {
        this.observers = [];
        this._likedImageIDs = likedImageIDs;
        this._recentlyViewedImages = recentlyViewedImages;
        this._galleries = galleries;
        this._isCurrentlyDragging = false;
        this._currentUser = currentUser;
        // Subscribe to changes in the authentication status of the firebase auth service
        AuthenticationService.onAuthStateChanged((user) => {
            this.currentUser = user;
        });
    }

    /** Helper function to reset all instance internal properties without notifying the observers */
    resetModel() {
        this._currentUser = null;
        this._likedImageIDs = [];
        this._galleries = [];
        this._recentlyViewedImages = [];
    }

    /**
     * Setter function to always notify observers when the current user is updated
     * @param {User} newValue - Updated value for the currentUser property
     */
    set currentUser(newValue) {
        this._currentUser = newValue;
        this.notifyObservers();
    }

    /** Getter function for the currentUser property (required for setter function) */
    get currentUser() {
        return this._currentUser;
    }

    /**
     * Setter function to always notify observers when the liked images are updated
     * @param {string[]} newValue - Updated value for the likedImageIDs property
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
     * @param {Gallery[]} newValue - Updated value for the galleries property
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

    /**
     * Setter function for the recentlyViewedImages property (required for getter function)
     * @param {Array<{ id: string, lastViewedAt: Number}>} imageArray - an array to save all the user's viewed imagesIDs
     */
    set recentlyViewedImages(imageArray) {
        this._recentlyViewedImages = imageArray; // Underscore before property name to avoid infinite loops with setter function
        this.notifyObservers();
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
     * Adds a new gallery to the users galleries.
     * @param {string} galleryName - Name of the gallery to add
     * @param {string[]} imageIDs - IDs of images to add to the newly created gallery
     * @returns {string} - The ID of the newly created gallery
     */
    addGallery(galleryName, imageIDs = []) {
        const newGalleryID = uuidV4();
        const newGallery = {
            title: galleryName,
            id: newGalleryID,
            imageIDs,
        };
        this.galleries = [...this.galleries, newGallery]; // add the new gallery object to the galleries array.
        return newGalleryID;
    }

    /**
     * Wrapper function for the firebase authentication sendPasswordResetEmail method
     * @param {string} email - Email address to pass to sendPasswordResetEmail
     */
    async sendPasswordResetEmail(email) {
        return await AuthenticationService.sendPasswordResetEmail(email);
    }

    /**
     * Wrapper function for the firebase authentication signInWithEmailAndPassword method
     * @param {string} email - Email address to pass to signInWithEmailAndPassword
     * @param {string} password - Password to pass to signInWithEmailAndPassword
     */
    async signInWithEmailAndPassword(email, password) {
        const userCredential =
            await AuthenticationService.signInWithEmailAndPassword(
                email,
                password
            );
        this.currentUser = userCredential.user;
    }

    /**
     * Wrapper function for the firebase authentication createUserWithEmailAndPassword method
     * @param {string} email - Email address to pass to createUserWithEmailAndPassword
     * @param {string} password - Password to pass to createUserWithEmailAndPassword
     */
    async createUserWithEmailAndPassword(email, password) {
        const userCredential =
            await AuthenticationService.createUserWithEmailAndPassword(
                email,
                password
            );
        this.currentUser = userCredential.user;
    }

    /**
     * Wrapper function for the firebase authentication updateProfile method to update displayName
     * @param {string} newUserName - User name to pass to updateProfile
     */
    async updateUserName(newUserName) {
        await AuthenticationService.currentUser.updateProfile({
            displayName: newUserName,
        });
        this.currentUser = { ...this.currentUser, displayName: newUserName };
    }

    /**
     * Wrapper function for the firebase authentication updateEmail method
     * @param {string} newEmail - Email address to pass to updateEmail
     */
    async updateEmail(newEmail) {
        await AuthenticationService.currentUser.updateEmail(newEmail);
        this.currentUser = { ...this.currentUser, email: newEmail };
    }

    /**
     * Wrapper function for the firebase authentication updatePassword method
     * @param {string} newPassword - Password to pass to updateEmail
     */
    async updatePassword(newPassword) {
        await AuthenticationService.currentUser.updatePassword(newPassword);
        this.currentUser = { ...this.currentUser, password: newPassword };
    }

    async deleteUser() {
        await AuthenticationService.currentUser.delete();
        this.resetModel();
    }

    /** Wrapper function for the firebase authentication signOut method */
    async signOut() {
        await AuthenticationService.signOut();
        this.resetModel();
    }

    /**
     * Removes an image ID from the specified gallery
     * @param {string} imageID - Identifier of the image to remove
     * @param {string} galleryID - Identifier of the gallery to remove the image to
     */
    removeImageFromGallery(imageID, galleryID) {
        const gallery = this.galleries.find(
            (gallery) => gallery.id === galleryID
        );
        if (!gallery) throw Error("Gallery with specified ID not found");
        const imageInGallery = gallery.imageIDs.includes(imageID);
        if (imageInGallery) {
            const updatedGallery = { ...gallery }; // Make a copy of the current state of the gallery
            updatedGallery.imageIDs = gallery.imageIDs.filter(
                (currentImageID) => currentImageID !== imageID
            ); // Keeps all but the specified image ID
            this.galleries = this.galleries.map((currentGallery) => {
                if (currentGallery.id === updatedGallery.id)
                    return updatedGallery; // Replace old with updated gallery
                return currentGallery;
            });
        }
    }
    /**
     * Remove/delete a gallery from the model
     * @param {string} galleryID - Identifier of the gallery to remove
     */
    removeGallery(galleryID) {
        const gallery = this.galleries.find(
            (gallery) => gallery.id === galleryID
        );
        if (!gallery) throw Error("Gallery with specified ID not found");
        this.galleries = this.galleries.filter(
            (currentGallery) => currentGallery.id !== galleryID
        );
    }

    /*
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
            const currentImageID =
                this.likedImageIDs[imageIDIndex % this.likedImageIDs.length]; // Go around in circle
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
            url: object.images[0].b.url,
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

export default GallangModel;
