const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const cors = require("cors");
const config = require("./config/default");
const { getGraphQLSchema } = require("./modules/Core/common");
require("./core/modules");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));

const queries = require("./resolvers/queries");
const mutations = require("./resolvers/mutations");

const root = {
    Query: { ...queries },
    Mutation: { ...mutations },
};

const schema = makeExecutableSchema({
    resolvers: root,
    typeDefs: getGraphQLSchema(),
});

app.use(
    "/graphql",
    graphqlHTTP((req, res) => ({
        schema,
        context: { req },
        graphiql: { headerEditorEnabled: true },
    }))
);

// Connect to DB
const mongoose = require("mongoose");

mongoose.connect(config.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("DB Connected");
});

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});
