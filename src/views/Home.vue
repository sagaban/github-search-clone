<template>
  <div class="home">
    <div class="flex flex-center row">
      <q-input filled v-model="search" label="Search" class="col-12 col-md-8">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1rem;
}
</style>
