<script setup lang="ts">
import { useFiltersStore } from "@/composables/filters.ts";

const filtersStore = useFiltersStore();
</script>

<template lang="pug">
b-dropdown(id="dropdown-operator" variant="primary" :text="filtersStore.getOperatorSelected.text" class="m-md-2" v-if="filtersStore.getPropertySelected.id !== -1")
  b-dropdown-item(v-for="item in filtersStore.getOperators" @click="filtersStore.setOperator(item)") {{ item.text }}
</template>