<script setup lang="ts">
import Table from "./components/Table.vue";
import FiltersBar from "./components/FiltersBar.vue";
</script>

<template lang="pug">
.app
  FiltersBar
  Table

</template>
<style scoped lang="scss">
.app {
  margin: 60px;
}
</style>
