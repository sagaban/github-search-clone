<template>
  <div class="home">
    <div class="flex flex-center row">
      <q-input
        filled
        v-model="searchString"
        label="Search"
        class="col-12 col-md-8"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div v-if="$apollo.loading">Loading...</div>

    Repositories count: {{ searchQuery }}
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Home",
  data() {
    return {
      searchString: "hola"
    };
  },
  apollo: {
    searchQuery: {
      query: gql`
        query Search($searchString: String!) {
          repos: search(query: $searchString, type: REPOSITORY) {
            repositoryCount
          }
        }
      `,
      update: data => {
        return data.repos.repositoryCount;
      },
      variables() {
        return {
          searchString: this.searchString
        };
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
