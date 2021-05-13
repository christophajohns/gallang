// -- UTILITY FUNCTIONS --

/**
 * Utility function to transform any string to its title case version (see https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript)
 * @param {string} str - String to transform
 * @returns Title case version of the input string
 */
export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
