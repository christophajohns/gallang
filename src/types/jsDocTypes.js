// This file only serves to hold the JSDoc type definitions in one place.

/**
 * @typedef Collection
 * @property {string} title - Name or title of the collection
 * @property {string} id - Unique identifier of the collection
 * @property {number} numberOfImages - The number of images or objects within the collection/exhibition
 * @property {Image[]} images - Array of objects or images within the collection
 */

/**
 * @typedef Gallery
 * @property {string} title - Name or title of the gallery
 * @property {string} id - Unique identifier of the gallery
 * @property {string[]} imageIDs - Array of identifiers of the images in the gallery
 */

/**
 * @typedef Recommendation
 * @property {string} title - Name or title for the recommendation basis (e.g. medium, period, designer)
 * @property {Image[]} images - Array of objects or images that are being recommended
 * @property {string} basisImageID - Identifier of the image that formed the basis for why these images were recommended
 */

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 * @property {string} [url] - Image url for the object
 */

/**
 * Function to be called when a model property changes.
 * @callback observerCallback
 */
