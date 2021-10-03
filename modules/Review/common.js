const {
    getReviewsByRestaurant: getReviewsByRestaurantDb,
    addReview: addReviewDb,
} = require("./db");

const getReviewsByRestaurant = async (restaurantId = "", params = {}) => {
    const result = await getReviewsByRestaurantDb(restaurantId, params);

    return result;
};

const addReview = async (restaurantId = "", data = {}) => {
    const result = await addReviewDb(restaurantId, data);

    return result;
};

module.exports = {
    getReviewsByRestaurant,
    addReview,
};
