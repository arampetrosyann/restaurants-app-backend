const fs = require("fs");
const eventBus = require("../../core/eventBus");
const queries = require("./resolvers/queries");
const { updateRestaurantDataRaw } = require("./common");

// Subscribe to events

eventBus.on("graphql.schema.def", async ({ schemaDefObj }) => {
    const schema = fs.readFileSync(`${__dirname}/schema.graphql`, {
        encoding: "utf8",
    });

    schemaDefObj.schemas.push(schema);
});

eventBus.on("graphql.resolvers.query", async ({ queries: queriesObj }) => {
    Object.assign(queriesObj, queries);
});

eventBus.on("review.add.after", async ({ restaurantId, reviews }) => {
    let reviewCount = 0;
    let averageRating = 0;

    if (reviews && reviews.length) {
        reviewCount = reviews.length;

        const ratingsSum = reviews.reduce((acc, review) => {
            return acc + review.rating;
        }, 0);
        
        averageRating = (ratingsSum / reviewCount).toFixed(2);
    }

    await updateRestaurantDataRaw(restaurantId, {
        averageRating: averageRating,
    });
});
