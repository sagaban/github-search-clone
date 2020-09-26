<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="drawerOpen = !drawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          GitHub search
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <app-drawer :drawer-open="drawerOpen" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppDrawer from "./components/AppDrawer.vue";

export default {
  name: "LayoutDefault",

  components: {
    AppDrawer
  },

  data() {
    return {
      drawerOpen: false
    };
  }
};
</script>

<style></style>
