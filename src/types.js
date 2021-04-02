/**
 * @typedef Collection
 * @property {string} title - Name or title of the collection
 * @property {string} id - Unique identifier of the collection
 * @property {number} numberOfImages - The number of images or objects within the collection/exhibition
 * @property {Image[]} images - Array of objects or images within the collection
 */

/**
 * @typedef Recommendation
 * @property {string} title - Name or title for the recommendation basis (e.g. medium, period, designer)
 * @property {Image[]} images - Array of objects or images that are being recommended
 */

/**
 * @typedef Image
 * @property {string} id - Unique identifier of the object or image
 * @property {string} url - Image url for the object
 */

/**
 * Function to be called when a model property changes.
 * @callback observerCallback
 */
