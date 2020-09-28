<template>
  <div>
    <q-separator spaced />

    <q-item>
      <q-item-section avatar class="item__avatar_section">
        <q-icon name="book" size="xs" color="grey" />
      </q-item-section>
      <q-item-section>
        <q-item-label
          ><a :href="itemData.url">{{ itemData.nameWithOwner }}</a>
        </q-item-label>
        <q-item-label lines="2">{{ itemData.description }}</q-item-label>
        <q-item-label caption class="info-row">
          <span class="info-item">
            <q-icon name="star" color="grey" />
            {{ itemData.stargazerCount }}
          </span>
          <span class="info-item" v-if="itemData.primaryLanguage">
            <q-icon
              name="stor_circle"
              size="xs"
              :style="`color: ${itemData.primaryLanguage.color}`"
              class="primary-language-icon"
            />
            {{ itemData.primaryLanguage.name }}
          </span>
          <span class="info-item" v-if="itemData.licenseInfo"
            >{{ itemData.licenseInfo.name }}
          </span>
          <span class="info-item"
            >Updated: {{ new Date(itemData.updatedAt) | formatDate }}
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "TabsPanelItemRepo",
  props: {
    itemData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "quasar/dist/quasar";

.item {
  &__avatar_section {
    min-width: 1rem;
    justify-content: flex-start;
    padding-right: 0.5rem;
    padding-top: 5px;
  }
}
.info-item {
  padding: 0.5rem;
}
.primary-language-icon {
  display: inline !important;
  font-size: 0.75rem !important;
  margin-left: -55px;
}
</style>
