<template>
  <div>
    <q-separator spaced />
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="itemData.avatarUrl" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <a :href="itemData.url">{{ itemData.name }}</a>
          <a :href="itemData.url" class="username-link">{{ itemData.login }}</a>
        </q-item-label>
        <q-item-label>{{ itemData.bio || itemData.description }}</q-item-label>
        <q-item-label caption class="info-row">
          <span class="info-item" v-if="itemData.location">
            {{ itemData.location }}
          </span>

          <span class="info-item" v-if="itemData.email">
            {{ itemData.email }}
          </span>
          <span class="info-item" v-if="itemData.followers">
            {{ itemData.followers.totalCount }} followers
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "TabsPanelItemUser",
  props: {
    itemData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "quasar/dist/quasar";

.username-link {
  color: $grey-7;
  margin-left: 1rem;
}
.info-item {
  padding-right: 1rem;
}
</style>
