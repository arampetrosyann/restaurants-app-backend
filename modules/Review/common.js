const {
    getReviewsByRestaurant: getReviewsByRestaurantDb,
    addReview: addReviewDb,
} = require("./db");
const eventBus = require("../../core/eventBus");

const getReviewsByRestaurant = async (restaurantId = "", params = {}) => {
    const result = await getReviewsByRestaurantDb(restaurantId, params);

    return result;
};

const addReview = async (restaurantId = "", data = {}) => {
    const result = await addReviewDb(restaurantId, data);

    await eventBus.emitAsync("review.add.after", {
        restaurantId: restaurantId,
        reviews: result
    });

    return result;
};

module.exports = {
    getReviewsByRestaurant,
    addReview,
};
