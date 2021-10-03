const fs = require("fs");
const eventBus = require("../../core/eventBus");
const queries = require("./resolvers/queries");
const mutations = require("./resolvers/mutations");

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

eventBus.on("graphql.resolvers.mutation", async ({ mutations: mutationsObj }) => {
    Object.assign(mutationsObj, mutations);
});
