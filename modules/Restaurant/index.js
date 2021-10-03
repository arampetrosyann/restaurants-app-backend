const fs = require("fs");
const eventBus = require("../../core/eventBus");
const queries = require("./resolvers/queries");

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