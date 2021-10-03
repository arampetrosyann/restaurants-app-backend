const { addReview } = require("../common");
const isEmail = require("../../../helpers/isEmail");

module.exports = {
    addRestaurantReview: async (__, { restaurantId = "", data = {} }, context) => {
        const { rating = 0, name = "", review = "", email = "" } = data;

        if (!String(restaurantId).trim().length) {
            throw new Error("IdRequired");
        }

        if (rating < 0 && rating > 5) {
            throw new Error("InvalidData");
        }

        if (
            !name.trim().length ||
            review.trim().length < 2 ||
            !isEmail(email)
        ) {
            throw new Error("InvalidData");
        }

        await addReview(restaurantId, data);

        return true;
    },
};
