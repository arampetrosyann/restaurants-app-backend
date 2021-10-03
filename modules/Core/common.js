const fs = require("fs");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const eventBus = require("../../core/eventBus");

const getGraphQLSchema = () => {
    const schema = fs.readFileSync(`${__dirname}/schema.graphql`, {
        encoding: "utf8",
    });

    const schemas = [schema];
    const schemaDefObj = { schemas };

    eventBus.emitSync("graphql.schema.def", { schemaDefObj });

    return mergeTypeDefs(schemaDefObj.schemas);
};

module.exports = {
    getGraphQLSchema,
};
