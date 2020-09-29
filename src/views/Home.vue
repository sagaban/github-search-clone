<template>
  <div class="home">
    <div class="flex flex-center row">
      <q-input
        filled
        v-model="searchString"
        label="Search"
        class="col-12 col-md-8"
        @input="cleanPagination"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <tabs v-if="searchResults" :tabs-data="searchResults" />
    <div class="search-message" v-else>Enter a value to search in GitHub</div>
    <div class="loading" v-if="$apollo.loading">Loading...</div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapState, mapGetters } from "vuex";

import Tabs from "@/components/TabsMain";
import {
  searchRepositoryDetailsFragment,
  searchIssueDetailsFragment,
  searchUserDetailsFragment,
  searchPullRequestDetailsFragment,
  searchOrganizationDetailsFragment
} from "@/graphql/fragments.js";

import { queryTypes } from "@/helpers/constants";

export default {
  name: "Home",
  components: {
    Tabs
  },
  data() {
    return {
      searchString: "",
      reposResult: null,
      issuesResult: null,
      usersResult: null,
      loading: false
    };
  },
  computed: {
    ...mapState({
      resultsPerPage: state => state.pagination.resultsPerPage
    }),
    ...mapGetters([
      "reposCurrentCursor",
      "issuesCurrentCursor",
      "usersCurrentCursor"
    ]),
    searchResults() {
      if (this.reposResult && this.issuesResult && this.usersResult)
        return {
          [queryTypes.REPOS]: this.reposResult.search,
          [queryTypes.ISSUES]: this.issuesResult.search,
          [queryTypes.USERS]: this.usersResult.search
        };
      return null;
    }
  },
  methods: {
    cleanPagination() {
      this.$store.dispatch("cleanPagination");
      this.$router.push({ query: { q: this.searchString } });
    },
    handleQueryResult(type, result) {
      if (!result.loading && !result.error) {
        this[type + "Result"] = result.data;
      }
    },
    updateCursor({ type, cursor }) {
      this[type + "Cursor"] = cursor;
      this.triggerSearch();
    }
  },
  apollo: {
    reposSearch: {
      query: gql`
        query SearchRepos(
          $searchString: String!
          $resultsPerPage: Int!
          $cursor: String
        ) {
          search(
            query: $searchString
            type: REPOSITORY
            first: $resultsPerPage
            after: $cursor
          ) {
            repositoryCount
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
            nodes {
              ...SearchRepositoryDetails
            }
          }
        }
        ${searchRepositoryDetailsFragment}
      `,
      manual: true,
      result(result) {
        this.handleQueryResult(queryTypes.REPOS, result);
      },

      variables() {
        return {
          searchString: this.searchString,
          resultsPerPage: this.resultsPerPage,
          cursor: this.reposCurrentCursor
        };
      },
      skip() {
        return this.searchString === "";
      }
    },
    issuesSearch: {
      query: gql`
        query SearchIssues(
          $searchString: String!
          $resultsPerPage: Int!
          $cursor: String
        ) {
          search(
            query: $searchString
            type: ISSUE
            first: $resultsPerPage
            after: $cursor
          ) {
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            issueCount
            nodes {
              ...SearchIssueDetails
              ...SearchPullRequestDetails
            }
          }
        }
        ${searchIssueDetailsFragment}
        ${searchPullRequestDetailsFragment}
      `,
      manual: true,
      result(result) {
        this.handleQueryResult(queryTypes.ISSUES, result);
      },

      variables() {
        return {
          searchString: this.searchString,
          resultsPerPage: this.resultsPerPage,
          cursor: this.issuesCurrentCursor
        };
      },
      skip() {
        return this.searchString === "";
      }
    },
    usersSearch: {
      query: gql`
        query SearchUsers(
          $searchString: String!
          $resultsPerPage: Int!
          $cursor: String
        ) {
          search(
            query: $searchString
            type: USER
            first: $resultsPerPage
            after: $cursor
          ) {
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            userCount
            nodes {
              ...SearchUserDetails
              ...SearchOrganizationDetails
            }
          }
        }
        ${searchUserDetailsFragment}
        ${searchOrganizationDetailsFragment}
      `,
      manual: true,
      result(result) {
        this.handleQueryResult(queryTypes.USERS, result);
      },

      variables() {
        return {
          searchString: this.searchString,
          resultsPerPage: this.resultsPerPage,
          cursor: this.usersCurrentCursor
        };
      },
      skip() {
        return this.searchString === "";
      }
    }
  },
  created() {
    const searchQueryParam = this.$route.query.q;
    if (searchQueryParam) {
      this.searchString = searchQueryParam;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1rem;

  .search-message {
    padding: 1rem;
    text-align: center;
    font-size: 1.5rem;
  }

  .loading {
    font-size: 1.2rem;
    padding: 1rem;
  }
}
</style>
