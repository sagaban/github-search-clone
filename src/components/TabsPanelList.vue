<template>
  <div class="list-wrapper">
    <q-list>
      <component
        v-for="item in tabData.nodes"
        :key="item.id"
        :is="tabInfo.component"
        :item-data="item"
      >
      </component>
    </q-list>
    <tabs-panel-pagination :tab-info="tabInfo" :tab-data="tabData" />
  </div>
</template>

<script>
import TabsPanelItemRepo from "@/components/TabsPanelItemRepo";
import TabsPanelItemIssue from "@/components/TabsPanelItemIssue";
import TabsPanelItemUser from "@/components/TabsPanelItemUser";
import TabsPanelPagination from "@/components/TabsPanelPagination";

export default {
  name: "TabPanelList",
  components: {
    TabsPanelItemRepo,
    TabsPanelItemIssue,
    TabsPanelItemUser,
    TabsPanelPagination
  },
  props: {
    tabInfo: {
      type: Object,
      required: true
    },
    tabData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  &::v-deep {
    .q-item__label {
      line-height: 1.5rem !important;
    }
  }
}
</style>
