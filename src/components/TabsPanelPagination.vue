<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      :value="current"
      @input="goToPage"
      :max="max"
      :max-pages="maxPages"
      :direction-links="true"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
    >
    </q-pagination>
  </div>
</template>

<script>
import { queryTypes } from "@/helpers/constants";
const countMapper = {
  [queryTypes.REPOS]: "repositoryCount",
  [queryTypes.ISSUES]: "issueCount",
  [queryTypes.USERS]: "userCount"
};
export default {
  name: "TabPanelPagination",
  props: {
    tabInfo: {
      type: Object,
      required: true
    },
    tabData: {
      type: Object,
      required: true
    }
  },
  computed: {
    max() {
      const itemsCountKey = countMapper[this.tabInfo.name];
      const totalPages = Math.ceil(
        this.tabData[itemsCountKey] /
          this.$store.state.pagination.resultsPerPage
      );
      const next = this.tabData.pageInfo.hasNextPage ? 1 : 0;
      const availablePages = this.current + next;
      return Math.min(availablePages, totalPages);
    },
    maxPages() {
      return Math.min(this.max, 5);
    },
    current() {
      return this.$store.state.pagination[this.tabInfo.name + "CurrentPage"];
    }
  },
  methods: {
    goToPage(page) {
      this.$store.dispatch("updateCursor", {
        type: this.tabInfo.name,
        cursor: this.tabData.pageInfo.endCursor,
        page
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
