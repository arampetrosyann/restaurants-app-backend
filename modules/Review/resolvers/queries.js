const { getReviewsByRestaurant } = require("../common");

module.exports = {
    restaurantReviews: async (__, { restaurantId = "", params = {} }, context) => {
        if (!String(restaurantId).trim().length) {
            throw new Error("IdRequired");
        }
        
        const result = await getReviewsByRestaurant(restaurantId, params);

        return result;
    },
};
