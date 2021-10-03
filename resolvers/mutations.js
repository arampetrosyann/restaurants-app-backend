const eventBus = require("../core/eventBus");

const mutations = {};

eventBus.emitSync("graphql.resolvers.mutation", { mutations });

module.exports = {
    ...mutations,
};
