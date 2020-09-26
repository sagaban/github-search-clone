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
    <div v-if="$apollo.loading">Loading...</div>
    <div v-if="$apollo.error">Error: {{ $apollo.error }}</div>

    Search result: {{ githubSearch }}
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Home",
  data() {
    return {
      searchString: "",
      githubSearch: null
    };
  },
  methods: {
    triggerSearch() {
      this.$apollo.queries.githubSearch.skip = false;
      this.$apollo.queries.githubSearch.refetch();
    },
    handleQueryResult(result) {
      if (!result.loading) {
        this.githubSearch = result.data;
      }
      this.$apollo.queries.githubSearch.skip = true;
    }
  },
  apollo: {
    githubSearch: {
      query: gql`
        query Search($searchString: String!) {
          repos: search(query: $searchString, type: REPOSITORY) {
            repositoryCount
          }
          issues: search(query: $searchString, type: ISSUE) {
            issueCount
          }
          users: search(query: $searchString, type: USER) {
            userCount
          }
        }
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
