const eventBus = require("../core/eventBus");

const queries = {};

eventBus.emitSync("graphql.resolvers.query", { queries });

module.exports = {
    ...queries,
};
