const {
    getRestaurantList: getRestaurantListDb,
    getRestaurantById: getRestaurantByIdDb,
} = require("./db");

const getRestaurantList = async (params = {}) => {
    const result = await getRestaurantListDb(params);

    return result;
};

const getRestaurantById = async (restaurantId = "") => {
    const result = await getRestaurantByIdDb(restaurantId);

    return result;
};

module.exports = {
    getRestaurantList,
    getRestaurantById,
};
