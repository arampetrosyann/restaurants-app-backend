const { getRestaurantList, getRestaurantById } = require("../common");

module.exports = {
    restaurants: async (__, { params = {} }, context) => {
        const result = await getRestaurantList(params);

        return result;
    },
    restaurant: async (__, { id = "" }, context) => {
        if (!String(id).trim().length) {
            throw new Error("IdRequired");
        }

        const result = await getRestaurantById(id);

        return result;
    },
};
