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
      const countKey = this.tabInfo.countKey;
      const totalPages = Math.ceil(
        this.tabData[countKey] / this.$store.state.pagination.resultsPerPage
      );
      const next = this.tabData.pageInfo.hasNextPage ? 1 : 0;
      const availablePages = this.current + next;
      return Math.min(availablePages, totalPages);
    },
    maxPages() {
      return Math.min(this.max, 5);
    },
    current() {
      return this.$store.state.pagination[this.tabInfo.name].currentPage;
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
