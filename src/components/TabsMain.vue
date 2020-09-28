<template>
  <div class="tabs-wrapper">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab
            v-for="tab in tabsInfo"
            :key="tab.name"
            :name="tab.name"
            :label="tab.label"
            :icon="tab.icon"
          >
            <q-badge color="accent" floating>{{
              tabsData[tab.name][tab.countKey] | formatBigAmount
            }}</q-badge>
          </q-tab>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel v-for="tab in tabsInfo" :key="tab.name" :name="tab.name">
            <div class="text-h5 q-mb-md">
              {{ tab.label }} ( {{ tabsData[tab.name][tab.countKey] }} results)
            </div>
            <tabs-panel-list :tab-info="tab" :tab-data="tabsData[tab.name]" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import TabsPanelList from "@/components/TabsPanelList";
import { queryTypes } from "@/helpers/constants";

export default {
  name: "TabsMain",
  components: {
    TabsPanelList
  },
  props: {
    tabsData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tab: queryTypes.REPOS,
      splitterModel: 20,
      tabsInfo: [
        {
          name: queryTypes.REPOS,
          label: "Repos",
          icon: "code",
          countKey: "repositoryCount",
          component: "TabsPanelItemRepo"
        },
        {
          name: queryTypes.ISSUES,
          label: "Issues",
          icon: "bug_report",
          countKey: "issueCount",
          component: "TabsPanelItemIssue"
        },
        {
          name: queryTypes.USERS,
          label: "Users",
          icon: "person",
          countKey: "userCount",
          component: "TabsPanelItemUser"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding-top: 1rem;

  &::v-deep {
    .q-tab__content {
      min-width: 70px;
    }
  }
}
</style>
