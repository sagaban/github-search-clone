const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.development.local")
});
// const { GRAPHQL_URI, AUTH_TOKEN } = require("./src/helpers/constants");

module.exports = {
  overwrite: true,
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `bearer ${process.env.VUE_APP_AUTH_TOKEN}`
      }
    }
  },
  documents: "src/graphql/fragments.js",
  generates: {
    // "src/generated/graphql.ts": {
    //   plugins: ["fragment-matcher"]
    // },
    // "srv/graphql/graphql.schema.json": {
    //   plugins: ["introspection"]
    // }
    "src/graphql/fragmentTypes.json": {
      plugins: ["fragment-matcher"]
    }
  }
};
