import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import { GRAPHQL_URI, AUTH_TOKEN } from "@/helpers/constants";
Vue.use(VueApollo);

import introspectionQueryResultData from "@/graphql/fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  headers: {
    Authorization: `bearer ${AUTH_TOKEN}`
  }
});

const link = httpLink;

const cache = new InMemoryCache({ fragmentMatcher });

const apolloClient = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default apolloProvider;
