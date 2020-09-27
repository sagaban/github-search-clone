<template>
  <q-item>
    <q-item-section>
      <q-item-label>USER</q-item-label>
      <q-item-label caption lines="2"
        >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
        elit.</q-item-label
      >
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>5 min ago</q-item-label>
      <q-icon name="star" color="yellow" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "TabsPanelItemUser"
};
</script>

<style lang="scss" scoped></style>
