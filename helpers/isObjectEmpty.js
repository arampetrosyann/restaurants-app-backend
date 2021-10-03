/**
 * @function
 *
 * @param {Object} obj - the object under test
 *
 * @returns {boolean}
 */

const isObjectEmpty = (obj = {}) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

module.exports = isObjectEmpty;
