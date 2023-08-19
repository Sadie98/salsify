<script setup lang="ts">
import { useFiltersStore } from "@/composables/filters.ts";

const filtersStore = useFiltersStore();
</script>

<template lang="pug">
b-dropdown(id="dropdown-property" :text="filtersStore.getPropertySelected.name" variant="primary" class="m-md-2")
  b-dropdown-item(v-for="item in filtersStore.getProperties" @click="filtersStore.setProperty(item)") {{ item.name }}

</template>