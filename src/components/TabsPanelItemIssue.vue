<template>
  <div>
    <q-separator spaced />

    <q-item>
      <q-item-section>
        <!-- <q-item-label caption>
          <a :href="userIssuesUrl">{{ userRepo }} #{{ itemData.number }}</a>
        </q-item-label> -->
        <q-item-label class="title-row">
          <a :href="itemData.url">{{ itemData.title }}</a>
        </q-item-label>
        <q-item-label>TODO</q-item-label>
        <q-item-label caption class="info-row"> </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
// TODO: type: ISSUE also return pull-requests.
export default {
  name: "TabsPanelItemIssue",
  props: {
    itemData: {
      type: Object,
      required: true
    }
  }
  // computed: {
  //   urlOrigin() {
  //     if (!this.itemData.url) {
  //       debugger;
  //     }
  //     const url = new URL(this.itemData);
  //     return url.origin;
  //   },
  //   userRepo() {
  //     if (!this.itemData.repository) {
  //       debugger;
  //     }
  //     const userUrl = new URL(this.itemData.repository.url);
  //     return userUrl.pathname;
  //   },
  //   userIssuesUrl() {
  //     return `${this.userRepo}/issues`;
  //   },
  //   userUrl() {
  //     return `${this.urlOrigin}/${this.userAndRepo}`;
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.title-row {
  font-size: 1.2rem;
}
</style>
