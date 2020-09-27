<template>
  <div class="home">
    <div class="flex flex-center row">
      <q-input
        filled
        v-model="searchString"
        label="Search"
        class="col-12 col-md-8"
        @keyup.enter="triggerSearch"
      >
        <template v-slot:append>
          <q-icon name="search" @click="triggerSearch" />
        </template>
      </q-input>
    </div>
    Search result: {{ searchResult }}
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else-if="$apollo.error">Error: {{ $apollo.error }}</div>
    <tabs v-else :search-result="searchResult" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import tabs from "@/components/TabsMain";
import {
  searchRepositoryDetailsFragment,
  searchIssueDetailsFragment,
  searchUserDetailsFragment
} from "@/graphql/fragments.js";

export default {
  name: "Home",
  components: {
    tabs
  },
  data() {
    return {
      searchString: "",
      searchResult: null
    };
  },
  methods: {
    triggerSearch() {
      this.$q.loading.show();
      this.$apollo.queries.githubSearch.skip = false;
      this.$apollo.queries.githubSearch.refetch();
    },
    handleQueryResult(result) {
      if (!result.loading) {
        this.searchResult = result.data;
        this.$q.loading.hide();
      }
      this.$apollo.queries.githubSearch.skip = true;
    }
  },
  apollo: {
    githubSearch: {
      query: gql`
        query Search($searchString: String!) {
          repos: search(query: $searchString, type: REPOSITORY, first: 10) {
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
          issues: search(query: $searchString, type: ISSUE, first: 10) {
            __typename
            issueCount
            nodes {
              ...SearchIssueDetails
            }
          }
          users: search(query: $searchString, type: USER, first: 10) {
            userCount
            nodes {
              ...SearchUserDetails
            }
          }
        }
        ${searchRepositoryDetailsFragment}
        ${searchIssueDetailsFragment}
        ${searchUserDetailsFragment}
      `,
      manual: true,
      result(result) {
        this.handleQueryResult(result);
      },

      variables() {
        return {
          searchString: this.searchString
        };
      },
      skip() {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1rem;
}
</style>
