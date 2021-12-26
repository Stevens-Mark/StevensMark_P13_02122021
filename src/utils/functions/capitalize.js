/**
 * Capitalizes the first letter of a given string
 * @function capitalize
 * @param {string} string 
 * @returns {string} string 
 */
export const capitalize = (string) => {
  return string && string[0].toUpperCase() + string.slice(1);
}

