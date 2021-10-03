const Restaurant = require("./model/restaurant");
const composeParams = require("../../helpers/composeParams");
const isObjectEmpty = require("../../helpers/isObjectEmpty");

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

const getRestaurantList = async (params = {}) => {
    const { pageSize = 10, page = 1, sort, dir = "ASC" } = params;

    const result = await Restaurant.aggregate([
        composeParams({
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

const getRestaurantById = async (restaurantId = "") => {
    const result = await Restaurant.findById(restaurantId);

    if (!result) {
        return null;
    }

    const restaurant = result.toJSON();

    return processDbData(restaurant);
};

const updateRestaurantDataRaw = async (restaurantId = "", data = {}) => {
    if (isObjectEmpty(data)) {
        return false;
    }

    await Restaurant.findByIdAndUpdate(
        restaurantId,
        { $set: data },
        { new: true }
    );

    return true;
};

module.exports = {
    getRestaurantList,
    getRestaurantById,
    updateRestaurantDataRaw
};
