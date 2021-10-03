const isObjectEmpty = require("./isObjectEmpty");

/**
 * @function
 *
 * @typedef composeParams
 *
 * @param {params} params
 *
 * @returns Object
 */

const composeParams = ({
    filters = {},
    pageSize = 10,
    page = 1,
    sort,
    dir = "ASC",
}) => {
    const data = [];
    const total = [{ $count: "count" }];

    if (!isObjectEmpty(filters)) {
        data.push({ $match: { ...filters } });
        total.unshift({ $match: { ...filters } });
    }

    if (sort && dir) {
        data.push({ $sort: { [sort]: dir === "ASC" ? 1 : -1 } });
    }

    data.push({ $skip: (page - 1) * pageSize });
    data.push({ $limit: pageSize });

    return {
        $facet: {
            data: data,
            total: total,
        },
    };
};

/**
 * params of {@link composeParams}
 *
 * @typedef params
 *
 * @type {object}
 *
 * @property {*} filters
 * @property {number} pageSize
 * @property {number} page
 * @property {string} sort
 * @property {string} dir ASC|DESC
 */

module.exports = composeParams;
