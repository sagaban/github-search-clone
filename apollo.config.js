import { GRAPHQL_URI } from "@/helpers/constants";

module.exports = {
  client: {
    service: {
      name: "github-api",
      url: GRAPHQL_URI
    },
    includes: ["src/**/*.vue", "src/**/*.js"]
  }
};
