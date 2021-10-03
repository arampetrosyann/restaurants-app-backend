const {
    getRestaurantList: getRestaurantListDb,
    getRestaurantById: getRestaurantByIdDb,
    updateRestaurantDataRaw: updateRestaurantDataRawDb,
} = require("./db");

const getRestaurantList = async (params = {}) => {
    const result = await getRestaurantListDb(params);

    return result;
};

const getRestaurantById = async (restaurantId = "") => {
    const result = await getRestaurantByIdDb(restaurantId);

    return result;
};

const updateRestaurantDataRaw = async (restaurantId = "", data = {}) => {
    return await updateRestaurantDataRawDb(restaurantId, data);
};

module.exports = {
    getRestaurantList,
    getRestaurantById,
    updateRestaurantDataRaw
};
