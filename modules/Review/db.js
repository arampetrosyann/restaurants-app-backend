const Review = require("./model/review");
const ObjectId = require("mongoose").Types.ObjectId;
const composeParams = require("../../helpers/composeParams");

const processDbData = (data = {}) => {
    let processed = {
        ...data,
    };

    if (processed._id) {
        processed.id = processed._id;
    }

    delete processed._id;
    delete processed.__v;

    return processed;
};

const getReviewsByRestaurant = async (restaurantId = "", params = {}) => {
    const { pageSize = 10, page = 1, sort, dir = "ASC" } = params;

    const result = await Review.aggregate([
        composeParams({
            filters: { restaurantId: ObjectId(restaurantId) },
            pageSize,
            page,
            sort,
            dir,
        }),
    ]);

    const items = result[0].data.map((item) => processDbData(item));
    const totalCount = result[0].total[0] ? result[0].total[0].count : 0;

    return {
        items: items,
        total: totalCount,
        totalPages: Math.ceil(totalCount / (pageSize || 10)),
    };
};

const addReview = async (id = "", data = {}) => {
    const review = new Review({
        ...data,
        restaurantId: id,
    });

    await review.validate();
    await review.save();

    const reviews = await Review.aggregate([
        { $match: { restaurantId: ObjectId(id) } },
    ]);

    return reviews.map((data) => processDbData(data));
};

module.exports = {
    getReviewsByRestaurant,
    addReview,
};
