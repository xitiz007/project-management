const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const PORT = process.env.PORT || 5000;
const schema = require("./schema/schema");
const connectDatabase = require("./config/db");

connectDatabase();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, console.log(`Server is running & listening on port ${PORT}`));
